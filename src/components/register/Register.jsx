import React, { useState, useRef, useEffect } from "react";
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.scss";

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(user, pwd);
		setSuccess(true);
	};
	return (
		<>
			{success ? (
				<section>
					<h1>Success!</h1>
					<p>
						<a href='#'>Sign In</a>
					</p>
				</section>
			) : (
				<section>
					<p
						ref={errRef}
						className={errMsg ? "auth-form-error" : "offscreen"}
						aria-live='assertive'
					>
						{errMsg}
					</p>
					<h1>Register</h1>
					<form className='auth-form' onSubmit={handleSubmit}>
						<label
							className='auth-form__user-label'
							htmlFor='username'
						>
							User name:
							<FontAwesomeIcon
								icon={faCheck}
								className={validName ? "valid" : "hide"}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={
									validName || !user ? "hide" : "invalid"
								}
							/>
						</label>

						<input
							className='auth-form__user-name'
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
						<label
							className='auth-form__password-label'
							htmlFor='password'
						>
							Password:
							<FontAwesomeIcon
								icon={faCheck}
								className={validPwd ? "valid" : "hide"}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={
									validPwd || !pwd ? "hide" : "invalid"
								}
							/>
						</label>
						<input
							className='auth-form__user-password'
							id='password'
							onChange={(e) => setPwd(e.target.value)}
							type='password'
							required
							aria-invalid={validPwd ? "false" : "true"}
							aria-describedby='pwdnote'
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						<p
							id='pwdnote'
							className={
								pwdFocus && !validPwd
									? "auth-form__password-instructions"
									: "offscreen"
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							8 to 24 characters.
							<br />
							Must include uppercase and lowercase letters, a
							number and a special character.
							<br />
							Allowed special characters:{" "}
							<span aria-label='exclamation mark'>!</span>{" "}
							<span aria-label='at symbol'>@</span>{" "}
							<span aria-label='hashtag'>#</span>{" "}
							<span aria-label='dollar sign'>$</span>{" "}
							<span aria-label='percent'>%</span>
						</p>
						<label htmlFor='confirm_pwd'>
							Confirm Password:
							<FontAwesomeIcon
								icon={faCheck}
								className={
									validMatch && matchPwd ? "valid" : "hide"
								}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={
									validMatch || !matchPwd ? "hide" : "invalid"
								}
							/>
						</label>
						<input
							type='password'
							id='confirm_pwd'
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validMatch ? "false" : "true"}
							aria-describedby='confirmnote'
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<p
							id='confirmnote'
							className={
								matchFocus && !validMatch
									? "instructions"
									: "offscreen"
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>

						<button
							disabled={
								!validName || !validPwd || !validMatch
									? true
									: false
							}
						>
							Sign Up
						</button>
					</form>

					<p>
						Already registered?
						<br />
						<span className='line'>
							<a href='/'>Sign In</a>
						</span>
					</p>
				</section>
			)}{" "}
		</>
	);
};

export default Register;
