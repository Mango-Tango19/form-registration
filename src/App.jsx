import * as React from "react";
import Register from "./components/register/Register";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import "./App.css";
function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Public />} />
				<Route path='register' element={<Register />} />
			</Route>
		</Routes>
	);
}

export default App;
