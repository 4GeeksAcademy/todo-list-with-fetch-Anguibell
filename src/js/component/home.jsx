import React from "react";
import ToDoList from "./ToDoList";

//create your first component
const Home = () => {
	return (
		<div className="">
			<div className="text-center fw-light todo">todos</div>
			<div className="bg-white cuadro">
				<ToDoList/>
			</div>
		</div>
	);
};

export default Home;