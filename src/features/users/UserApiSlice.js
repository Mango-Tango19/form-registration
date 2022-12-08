import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => "/users",
			validateStatus: (response, result) => {
				return response.status === 200 && !result.isError;
			},
			keepUnusedDataFor: 5,
			transformResponse: (response) => {
				const loadedUsers = response.map((item) => {
					return { ...item, id: item._id };
				});

				return userAdapter.setAll(initialState, loadedUsers);
			},
			providesTags: (result, err, arg) => {
				if (!result?.ids) {
					return [{ type: "User", id: "LIST" }, ...result];
				} else {
					return [{ type: "User", id: "LIST" }];
				}
			},
		}),
	}),
});

export const { useGetUsersQuery } = userApiSlice;

//returns query result obj
export const selectUsersResult = userApiSlice.endpoints.getUsers.select();

//create memoized selector
const selectUsersData = createSelector(
	selectUsersResult,
	(userResult) => userResult.data //norm state obj with ids, entities
);

export const {
	selectAll: selectAllUsers,
	selectById: selectUserById,
	selectIds: selectUsersIds,
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
