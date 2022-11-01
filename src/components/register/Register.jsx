import React, { useState, useRef, useEffect } from "react";
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState("");
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd, matchPwd]);

	return (
		<section>
			<p
				ref={errRef}
				className={errMsg ? "form_error" : "offscreen"}
				aria-live='assertive'
			>
				{errMsg}
			</p>
			<h1>Register</h1>
			<form className='auth-form'>
				<label className='auth-form__user-label' htmlFor='username'>
					User name:
				</label>
				<FontAwesomeIcon
					icon={faCheck}
					className={validName ? "valid" : "hide"}
				/>
				<FontAwesomeIcon
					icon={faTimes}
					className={validName || !user ? "hide" : "invalid"}
				/>
				<input
					className='auth-form__user-input'
					id='username'
					ref={userRef}
					onChange={(e) => setUser(e.target.value)}
					type='text'
					autoComplete='off'
					required
					aria-invalid={validName ? "false" : "true"}
					aria-describedby='uidnote'
					onFocus={() => setUserFocus(true)}
					onBlur={() => setUserFocus(false)}
				/>
				<p
					id='uidnote'
					className={
						userFocus && user && !validName
							? "auth-form__user-instructions"
							: "offscreen"
					}
				>
					<FontAwesomeIcon icon={faInfoCircle} />
					4 to 24 characters.
					<br />
					Must begin with a letter.
					<br />
					Letters, numbers, underscores, hyphens allowed.
				</p>
			</form>
		</section>
	);
};

export default Register;
