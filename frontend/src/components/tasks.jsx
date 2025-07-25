
import React, {useState} from 'react';
import './homepage.css'; 
import NewTasksModal from './addNewTask'

const Tasks = ({ userID }) => {

    const [isCreatingTask, setIsCreatingTask] = useState(false)

    const handleNewTask = () => {
        setIsCreatingTask(true)
        getTasks()
    }

    const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:8000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: {"userID": userID},
            });
            const data = await response.json();
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <div>
            {(isCreatingTask)?<NewTasksModal setIsCreatingTask={setIsCreatingTask} />:<></>}
        </div>
        <div className="container">
            <h2>My Tasks</h2>
            <div className="controls">
                <div>
                    <button className="btn">🔍 Filter</button>
                    <button className="btn">⇅ Sort</button>
                    <button className="btn" onClick={handleNewTask}>+ New Task</button>
                </div>
                <button className="btn new-task">+ New Task</button>
            </div>

            <div className="columns">
                <div className="column todo">
                    <h3>To Do (2)</h3>
                    <div className="task">
                        <h4>Research competitors <span className="priority p1">P1</span></h4>
                        <p>Analyze top 5 competitors in the market</p>
                    </div>
                    <div className="task">
                        <h4>Design homepage mockup <span className="priority p2">P2</span></h4>
                        <p>Create wireframes for the new homepage</p>
                    </div>
                </div>

                <div className="column progress">
                    <h3>In Progress (2)</h3>
                    <div className="task">
                        <h4>Implement authentication <span className="priority p1">P1</span></h4>
                        <p>Add login and registration functionality</p>
                    </div>
                    <div className="task">
                        <h4>Write API documentation <span className="priority p3">P3</span></h4>
                        <p>Document all endpoints with examples</p>
                    </div>
                </div>

                <div className="column done">
                    <h3>Done (2)</h3>
                    <div className="task">
                        <h4>Fix navigation bug <span className="priority p2">P2</span></h4>
                        <p>Address the issue with dropdown menu</p>
                    </div>
                    <div className="task">
                        <h4>Deploy to staging <span className="priority p1">P1</span></h4>
                        <p>Push latest changes to staging environment</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Tasks