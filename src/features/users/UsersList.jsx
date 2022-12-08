import React from "react";
import { useGetUsersQuery } from "./UserApiSlice";
import User from "./User";

const UsersList = () => {
	const {
		data: users,
		isError,
		isLoading,
		isSuccess,
		error,
	} = useGetUsersQuery();

	let content;

	if (isLoading) content = <h1>Loading...</h1>;

	if (isError) content = <p>{error?.data?.message}</p>;
	if (isSuccess) {
		const { ids } = users;

		const tableContent = ids.length
			? ids.map((id) => <User key={id} userId={id} />)
			: null;

		content = (
			<table>
				<thead>
					<tr>
						<th>User name</th>
						<th>Roles</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		);
	}

	return content;
};

export default UsersList;
