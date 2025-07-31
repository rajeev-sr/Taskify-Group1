
import React, {useState, useEffect} from 'react';
import './homepage.css'; 
import NewTasksModal from './addNewTask'

const Tasks = ({ userID }) => {

    useEffect(() => {
        getTasks()
    }, [])

    const [isCreatingTask, setIsCreatingTask] = useState(false)
    const [tasks, setTasks] = useState([])
    const [tasksTODO, setTODO] = useState([])
    const [tasksINPR, setINPR] = useState([])
    const [tasksDONE, setDONE] = useState([])

    useEffect(() => {
        setTODO(tasks.filter(task => task.status === "To Do"))
        setINPR(tasks.filter(task => task.status === "In Progress"))
        setDONE(tasks.filter(task => task.status === "Done"))
    }, [tasks])

    const handleNewTask = () => {
        setIsCreatingTask(true)
    }

    const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:8000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            setTasks(data)
            console.log(data)
            console.log("todo: ", tasksTODO, "in progress: ", tasksINPR, "done", tasksDONE)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <div>
            {(isCreatingTask)?<NewTasksModal setIsCreatingTask={setIsCreatingTask} userID={userID} />:<></>}
        </div>
        <div className="container">
            <h2>My Tasks</h2>
            <div className="controls">
                <div>
                    <button className="btn">🔍 Filter</button>
                    <button className="btn">⇅ Sort</button>
                    <button className="btn" onClick={handleNewTask}>+ New Task</button>
                    <button className="btn" onClick={getTasks}>⟳ Refresh Tasks</button>
                </div>
            </div>

            <div className="columns">
                <div className="column todo">
                    <h3>To Do ({tasksTODO.length})</h3>
                    {tasksTODO.map((task, idx) => (
                        <div className="task" key={idx}>
                            <h4>{task.header} <span className={`priority ${task.priority}`}>{task.priority}</span></h4>
                            <p>{task.description}</p>
                        </div>
                    ))}
                </div>

                <div className="column progress">
                    <h3>In Progress ({tasksINPR.length})</h3>
                    {tasksINPR.map((task, idx) => (
                        <div className="task" key={idx}>
                            <h4>{task.header} <span className={`priority ${task.priority}`}>{task.priority}</span></h4>
                            <p>{task.description}</p>
                        </div>
                    ))}
                </div>

                <div className="column done">
                    <h3>Done ({tasksDONE.length})</h3>
                    {tasksDONE.map((task, idx) => (
                        <div className="task" key={idx}>
                            <h4>{task.header} <span className={`priority ${task.priority}`}>{task.priority}</span></h4>
                            <p>{task.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Tasks