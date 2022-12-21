import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/UserApiSlice";
import { selectNoteById } from "./NoteApiSlice";
import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
const EditNote = () => {
	const { id } = useParams();
	const users = useSelector(selectAllUsers);
	const note = useSelector((state) => selectNoteById(state, id));

	let content =
		users && note ? (
			<EditNoteForm users={users} note={note} />
		) : (
			<p>Loading...</p>
		);

	return content;
};

export default EditNote;
