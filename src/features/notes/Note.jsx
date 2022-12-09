import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./NoteApiSlice";
import React from "react";

const Note = ({ noteId }) => {
	const note = useSelector((state) => selectNoteById(state, noteId));
	const navigate = useNavigate();
	if (note) {
		const handleEdit = () => navigate(`/dash/notes/${noteId}`);
		const created = new Date(note.createdAt).toLocaleString("ru-RU", {
			day: "numeric",
			month: "long",
		});
		const updated = new Date(note.updatedAt).toLocaleString("ru-RU", {
			day: "numeric",
			month: "long",
		});

		return (
			<tr>
				<td>{note.username}</td>

				<td>{created}</td>
				<td>{updated}</td>
				<td>{note.title}</td>
				<td>
					{note.conpleted ? (
						<span>Completed</span>
					) : (
						<span>Open</span>
					)}
				</td>

				<td>
					<button onClick={handleEdit}>edit</button>
				</td>
			</tr>
		);
	} else return null;
};

export default Note;
