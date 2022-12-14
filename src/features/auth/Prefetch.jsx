import { store } from "../../app/store";
import { userApiSlice } from "../users/UserApiSlice";
import { noteApiSlice } from "../notes/NoteApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
	useEffect(() => {
		console.log("subscribe");

		const users = store.dispatch(
			userApiSlice.endpoints.getUsers.initiate()
		);
		const notes = store.dispatch(
			noteApiSlice.endpoints.getNotes.initiate()
		);

		return () => {
			console.log("unsubscribe");
			users.unsubscribe();
			notes.unsubscribe();
		};
	}, []);

	return <Outlet />;
};

export default Prefetch;
