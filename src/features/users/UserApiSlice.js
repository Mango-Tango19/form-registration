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

			transformResponse: (response) => {
				const loadedUsers = response.map((item) => {
					item.id = item._id;
					return item;
				});

				return userAdapter.setAll(initialState, loadedUsers);
			},
			providesTags: (result, err, arg) => {
				if (!result?.ids) {
					return [
						{ type: "User", id: "LIST" },
						...result.ids.map((id) => ({ type: "User", id })),
					];
				} else {
					return [{ type: "User", id: "LIST" }];
				}
			},
		}),
		addNewUser: builder.mutation({
			query: (initialData) => ({
				query: "/users",
				method: "POST",
				body: { ...initialData },
			}),
			invalidatesTags: [{ type: "User", id: "LIST" }],
		}),
		updateUser: builder.mutation({
			query: (initialData) => ({
				url: "/users",
				method: "PATCH",
				body: { ...initialData },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "User", id: arg.id },
			],
		}),
		deleteUser: builder.mutation({
			query: ({ id }) => ({
				url: "/users",
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "User", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useAddNewUserMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
} = userApiSlice;

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
