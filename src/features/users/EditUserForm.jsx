import { useState, useEffect } from "react";
import {
	useDeleteUserMutation,
	useUpdateUserMutation,
} from "../users/UserApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-0z-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
	const navigate = useNavigate();

	const [updateUser, { isLoading, isSuccess, isError, error }] =
		useUpdateUserMutation();

	const [
		deleteUser,
		{
			isLoading: isLoadingDelUser,
			isSuccess: isSuccessDelUser,
			isError: iserrorDelUser,
			error: delError,
		},
	] = useDeleteUserMutation();

	const [username, setUsername] = useState(user.username);
	const [validUsername, setValidUsername] = useState(false);
	const [password, setPassword] = useState(user.password);
	const [validPassword, setValidPassword] = useState(false);
	const [active, setActive] = useState(user.active);
	const [roles, setRoles] = useState(user.roles);

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(username));
	}, [password]);

	useEffect(() => {
		if (isSuccess || isSuccessDelUser) {
			setUsername("");
			setActive(false);
			setPassword("");
			setUsername("");
			setRoles([]);
			navigate("/dash/users");
		}
	}, [isSuccess, navigate, isSuccessDelUser]);

	const onUserChanged = (e) => setUsername(e.target.value);

	const onPasswordChanged = (e) => setPassword(e.target.value);

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);

		setRoles(values);
	};

	const onActiveChange = () => setActive((prev) => !prev);

	const onEditUsersClick = async (e) => {
		e.preventDefault();
		if (password) {
			await updateUser({
				id: user.id,
				username,
				password,
				roles,
				active,
			});
		} else {
			await updateUser({ id: user.id, username, roles, active });
		}
	};

	const onDeleteUsersClick = async (e) => {
		e.preventDefault();
		await deleteUser(user.id);
	};

	const canSave =
		[roles.length, username, password].every(Boolean) && !isLoading;

	return <div>EditUserForm</div>;
};

export default EditUserForm;
