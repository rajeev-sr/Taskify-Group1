import React, { useState } from "react"
import "./addNewTask.css"

function TaskModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        priority: "2 (Medium)",
        status: "To Do"
    });

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: [e.target.value]})
    }

    const handleSubmit = () => {
        console.log("Creating new task : ", newTask)
        setIsOpen(false)
        //send newTask object to backend
    }

    return (
        <div>
            <button onCLick = {() => setIsOpen}></button>

            {isOpen && (
                <div className="modal">
                    <span className="close" onClick={() => setIsOpen(false)}></span>
                    <label>Title</label>
                    <input name="title" value={newTask.title} onChange={handleChange} />

                    <label>Description</label>
                    <textarea name="description" value={newTask.description} onChange={handleChange} />

                    <label>Priority</label>
                    <select name="priority" value={newTask.priority} onChange={handleChange}>
                    <option>1 (High)</option>
                    <option>2 (Medium)</option>
                    <option>3 (Low)</option>
                    </select>
                    
                    <label>Status</label>
                    <select name="status" value={newTask.status} onChange={handleChange}>
                    <option>To Do</option>
                    </select>

                    <div style={{ marginTop: "1rem" }}>
                        <button onClick={() => setIsOpen(false)}>Cancel</button>
                        <button onClick={handleSubmit} style={{ marginLeft: "1rem" }}>Create Task</button>
                    </div>

                    
                </div>
            )}
        </div>
    )
}


export default TaskModal