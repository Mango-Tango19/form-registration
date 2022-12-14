import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const noteAdapter = createEntityAdapter({});

const initialState = noteAdapter.getInitialState();

export const noteApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getNotes: builder.query({
			query: () => "/notes",
			validateStatus: (response, result) => {
				return response.status === 200 && !result.isError;
			},

			transformResponse: (response) => {
				const loadednotes = response.map((item) => {
					item.id = item._id;
					return item;
				});

				return noteAdapter.setAll(initialState, loadednotes);
			},
			providesTags: (result, err, arg) => {
				if (!result?.ids) {
					return [
						{ type: "Note", id: "LIST" },
						...result.ids.map((id) => ({ type: "Note", id })),
					];
				} else {
					return [{ type: "Note", id: "LIST" }];
				}
			},
		}),
		addNewNote: builder.mutation({
			query: (initialData) => ({
				url: "/notes",
				method: "POST",
				body: { ...initialData },
			}),
			invalidatesTags: [{ type: "Note", id: "LIST" }],
		}),
		updateNote: builder.mutation({
			query: (initialData) => ({
				url: "/notes",
				method: "PATCH",
				body: { ...initialData },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Note", id: arg.id },
			],
		}),
		deleteNote: builder.mutation({
			query: ({ id }) => ({
				url: "/notes",
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Note", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetNotesQuery,
	useAddNewNoteMutation,
	useDeleteNoteMutation,
	useUpdateNoteMutation,
} = noteApiSlice;

//returns query result obj
export const selectNotesResult = noteApiSlice.endpoints.getNotes.select();

//create memoized selector
const selectNotesData = createSelector(
	selectNotesResult,
	(noteResult) => noteResult.data //norm state obj with ids, entities
);

export const {
	selectAll: selectAllNotes,
	selectById: selectNoteById,
	selectIds: selectNotesIds,
} = noteAdapter.getSelectors((state) => selectNotesData(state) ?? initialState);
