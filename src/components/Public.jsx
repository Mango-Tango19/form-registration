import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
	return (
		<div>
			<h1>Hello, Im public page</h1>
			<Link to={"/login"}>Login</Link>
		</div>
	);
};

export default Public;
