import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/UserApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
	const users = useSelector(selectAllUsers);

	let content = users ? <NewNoteForm users={users} /> : <p>Loading...</p>;
	return content;
};

export default NewNote;
