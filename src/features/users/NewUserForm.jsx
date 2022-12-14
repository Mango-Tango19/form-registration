import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "../users/UserApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
	const [addNewUser, { isLoading, isError, isSuccess, error }] =
		useAddNewUserMutation();

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [validUSername, setValidUsername] = useState(false);
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [roles, setRoles] = useState(["Employee"]);

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(username));
	}, [password]);

	useEffect(() => {
		if (isSuccess) {
			setUsername("");
			setPassword("");
			setRoles([]);
			navigate("/dash/users");
		}
	}, [isSuccess, navigate]);

	const onUserChanged = (e) => setUsername(e.target.value);

	const onPasswordChanged = (e) => setPassword(e.target.value);

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);

		setRoles(values);
	};

	const canSave =
		[roles.length, username, password].every(Boolean) && !isLoading;

	const onSaveUsersClick = async (e) => {
		e.preventDefault();
		await addNewUser({ username, password, roles });
	};

	const options = Object.values(ROLES).map((role) => {
		return (
			<option value={role} key={role}>
				{role}
			</option>
		);
	});

	const errClass = isError ? "errmsg" : "offscreen";
	const validUserClass = !validUSername ? "form__input--incomplite" : "";
	const validPwdClass = !validPassword ? "form__input--incomplite" : "";
	const validRolesClass = !Boolean(roles.length)
		? "form__input--incomplite"
		: "";

	const content = (
		<>
			<p className={errClass}>{error?.data?.message}</p>

			<form className='form' onSubmit={onSaveUsersClick}>
				<div className='form__title-row'>
					<h2>New User</h2>
					<div className='form__action-buttons'>
						<button
							className='icon-button'
							title='Save'
							disabled={!canSave}
						>
							{/* <FontAwesomeIcon icon={faSave} /> */}
							Save
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
					onChange={onUserChanged}
				/>

				<label className='form__label' htmlFor='password'>
					Password:{" "}
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

export default NewUserForm;
