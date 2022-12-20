import { useState, useEffect } from "react";
import { useDeleteUserMutation, useUpdateUserMutation } from "./UserApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

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

	const onUserNameChanged = (e) => setUsername(e.target.value);

	const onPasswordChanged = (e) => setPassword(e.target.value);

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);

		setRoles(values);
	};

	const onActiveChange = () => setActive((prev) => !prev);

	const onSaveUserClicked = async (e) => {
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
		await deleteUser({ id: user.id });
	};

	let canSave;
	if (password) {
		canSave =
			[roles.length, validUsername, validPassword].every(Boolean) &&
			!isLoading;
	} else {
		canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
	}

	const options = Object.values(ROLES).map((role) => {
		return (
			<option key={role} value={role}>
				{" "}
				{role}
			</option>
		);
	});

	const errClass = isError ? "errmsg" : "offscreen";
	const validUserClass = !validUsername ? "form__input--incomplite" : "";
	const validPwdClass = !validPassword ? "form__input--incomplite" : "";
	const validRolesClass = !Boolean(roles.length)
		? "form__input--incomplite"
		: "";
	const errContent = (error?.data?.message || delError?.data?.message) ?? "";

	const content = (
		<>
			<p className={errClass}>{errContent}</p>

			<form className='form' onSubmit={(e) => e.preventDefault()}>
				<div className='form__title-row'>
					<h2>Edit User</h2>
					<div className='form__action-buttons'>
						<button
							className='icon-button'
							title='Save'
							onClick={onSaveUserClicked}
							disabled={!canSave}
						>
							{" "}
							Save
							{/* <FontAwesomeIcon icon={faSave} /> */}
						</button>
						<button
							className='icon-button'
							title='Delete'
							onClick={onDeleteUsersClick}
						>
							{" "}
							Delete
							{/* <FontAwesomeIcon icon={faTrashCan} /> */}
						</button>
					</div>
				</div>
				<label className='form__label' htmlFor='username'>
					Username: <span className='nowrap'>[3-20 letters]</span>
				</label>
				<input
					className={`form__input ${validUserClass}`}
					id='username'
					name='username'
					type='text'
					autoComplete='off'
					value={username}
					onChange={onUserNameChanged}
				/>

				<label className='form__label' htmlFor='password'>
					Password:{" "}
					<span className='nowrap'>[empty = no change]</span>{" "}
					<span className='nowrap'>[4-12 chars incl. !@#$%]</span>
				</label>
				<input
					className={`form__input ${validPwdClass}`}
					id='password'
					name='password'
					type='password'
					value={password}
					onChange={onPasswordChanged}
				/>

				<label
					className='form__label form__checkbox-container'
					htmlFor='user-active'
				>
					ACTIVE:
					<input
						className='form__checkbox'
						id='user-active'
						name='user-active'
						type='checkbox'
						checked={active}
						onChange={onActiveChange}
					/>
				</label>

				<label className='form__label' htmlFor='roles'>
					ASSIGNED ROLES:
				</label>
				<select
					id='roles'
					name='roles'
					className={`form__select ${validRolesClass}`}
					multiple={true}
					size='3'
					value={roles}
					onChange={onRolesChanged}
				>
					{options}
				</select>
			</form>
		</>
	);

	return content;
};

export default EditUserForm;
