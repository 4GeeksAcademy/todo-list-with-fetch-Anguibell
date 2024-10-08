import React, { useState, useEffect } from "react";
import Task from "./Task";

const ToDoList = () => {

    const [newTask, setNewTask] = useState("")

    const [taskList, setTaskList] = useState([])

    const handleKeyPress = (event) => {
		if (event.key == "Enter" && newTask.trim() !== "") {
			addTodo()
		}
	}

    const createTasks = async () => {
        const post = await fetch('https://playground.4geeks.com/todo/todos/Anguibell', {
            method: "POST",
            body: JSON.stringify(
                {label: newTask, is_done: false}
            ),
            headers: {
              "Content-Type": "application/json"
            }
          })
          const data = await post.json()
    }

	const addTodo = () => {
		if (newTask.trim() !== "") {
            createTasks()
			setTaskList([...taskList, {label: newTask, is_done: false}])
			setNewTask("")
		}
	}

	const handleDelete = async (index, id) => {
        const borrar = await fetch('https://playground.4geeks.com/todo/todos/' + id, {
            method: "DELETE",
        }) 
        if (borrar.ok) {
              setTaskList(taskList.filter((_tarea, indiceABorrar)=> (index != indiceABorrar)))
          }
	}

    const loadTasks = async () => {
        const response = await fetch('https://playground.4geeks.com/todo/users/Anguibell')
        if (!response.ok) {
            await fetch('https://playground.4geeks.com/todo/users/Anguibell', {
                method: "POST"
                }
              ); loadTasks()
        }
        const data = await response.json()
        setTaskList(data.todos)
    }

    useEffect(()=>{
        loadTasks()
    }, [])

    return (
        <div className="">
            <input className="w-100 border border-0 py-3 px-5 fs-4" type="text" value={newTask} placeholder="What do you want to do next?" 
            onChange={(event) => setNewTask(event.target.value)} 
            onKeyUp={(event) => handleKeyPress(event) }/>

            {(taskList && taskList.length == 0) && <div className="py-3 px-5 fs-4">No tasks, add a task</div>}
            {taskList && taskList.map( (tarea, index) => <Task task={tarea} key={index} onRemove={()=>handleDelete(index, tarea.id)} />)}
            <p className="my-0 p-2 text-black-50">{taskList && taskList.length} items left</p>
        </div>
    )
}

export default ToDoList;