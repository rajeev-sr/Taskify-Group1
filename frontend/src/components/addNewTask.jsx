import React, { useState } from "react"
import "./addNewTask.css"

function NewTaskModal({ setIsCreatingTask, userID }) {
    const [isOpen, setIsOpen] = useState(false)
    const [newTask, setNewTask] = useState({
      userID,
      header: "",
      description: "",
      priority: "p2",
      status: "To Do"
    });

    const handleClose = () => {
        setIsCreatingTask(false)
    }

    const handleChange = (e) => {
        setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        console.log("Creating new task : ", newTask)
        try {
            const response = await fetch('http://localhost:8000/new-task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });
            const data = await response.json()
        } catch (err) {
            console.error(err);
        }
        setIsCreatingTask(false)
    }

    return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Task</h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              name="header"
              value={newTask.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            >
              <option>p1</option>
              <option>p2</option>
              <option>p3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={newTask.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="ml-3 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  )
}


export default NewTaskModal