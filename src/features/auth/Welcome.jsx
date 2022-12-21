import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
	const date = new Date();

	const today = new Intl.DateTimeFormat("ru-RU").format(date);
	return (
		<section className='welcome'>
			<p>{today}</p>

			<h1>Welcome!</h1>

			<p>
				<Link to='/dash/notes'>view notes</Link>
			</p>

			<p>
				<Link to='/dash/notes/new'>add new tech note</Link>
			</p>

			<p>
				<Link to='/dash/users'>view user settings</Link>
			</p>

			<p>
				<Link to='/dash/users/new'>add new user</Link>
			</p>
		</section>
	);
};

export default Welcome;
