import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const DashFooter = () => {
	const { pathName } = useLocation();
	const navigate = useNavigate();
	const goHome = () => navigate("/");

	let goHomeButton = null;

	if (pathName !== "/dash") {
		<button
			onClick={goHome}
			title='Home'
			className='dash-footer__button icon-button'
		>
			<FontAwesomeIcon icon={faHouse} />
		</button>;
	}

	return (
		<footer className='dash-footer'>
			{goHomeButton}
			<p>User:</p>
			<p>Role:</p>
		</footer>
	);
};

export default DashFooter;
