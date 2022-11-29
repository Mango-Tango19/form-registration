import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import UsersList from "./features/users/UsersList";
import NotesList from "./features/notes/NotesList";
import "./App.css";
import Login from "./features/auth/Login";
function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Public />} />
				<Route path='login' element={<Login />} />
				<Route path='dash' element={<DashLayout />}>
					<Route index element={<Welcome />} />

					<Route path='users'>
						<Route index element={<UsersList />} />
					</Route>

					<Route path='notes'>
						<Route index element={<NotesList />} />
					</Route>
				</Route>{" "}
				{/*End dash route*/}
			</Route>
		</Routes>
	);
}

export default App;
