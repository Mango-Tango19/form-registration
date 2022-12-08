import React from "react";
import { useGetUsersQuery } from "./UserApiSlice";

const UsersList = () => {
	const {
		data: users,
		isError,
		isLoading,
		isSuccess,
		error,
	} = useGetUsersQuery();
	return <h1>UsersList</h1>;
};

export default UsersList;
