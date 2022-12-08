import React from "react";
import { useGetNotesQuery } from "./NoteApiSlice";

const NotesList = () => {
	const {
		data: notes,
		isError,
		isLoading,
		isSuccess,
		error,
	} = useGetNotesQuery();

	let content;

	if (isLoading) content = <h1>Loading...</h1>;

	if (isError) content = <p>{error?.data?.message}</p>;
	if (isSuccess) {
		const { ids } = notes;
		const tableContent = ids.length
			? ids.map((id) => <Note key={id} noteId={id} />)
			: null;

		content = (
			<table>
				<thead>
					<tr>
						<th>User name</th>
						<th>Created</th>
						<th>Updated</th>
						<th>Owner</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		);
	}
};

export default NotesList;
