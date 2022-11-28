import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
	return (
		<div>
			<h1>Hello, Im public page</h1>
			<Link to={"/register"}>Register</Link>
		</div>
	);
};

export default Public;
