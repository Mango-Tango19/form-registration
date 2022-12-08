import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./UserApiSlice";
import React from "react";

const User = ({ userId }) => {
	const user = useSelector((state) => selectUserById(state, userId));

	const navigate = useNavigate();

	if (user) {
		const handleEdit = () => navigate(`/dash/users/${userId}`);
		const userRoleString = user.roles.toString().replace(",", ", ");
		const cellStatus = user.active ? "" : "table__cell--inactive";
		return (
			<tr>
				<td>{user.username}</td>
				<td>{userRoleString}</td>
				<td className={`${cellStatus}`}>
					<button onClick={handleEdit}>edit</button>
				</td>
			</tr>
		);
	} else return null;
};

export default User;
