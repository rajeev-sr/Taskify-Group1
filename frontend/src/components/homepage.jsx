import React, {useState} from 'react';
import './homepage.css'; 
import Tasks from './tasks'
import Notes from './notes'
import Profile from './profile'


const HomePage = ({ setIsLoggedIn, userID }) => {
  const [currDisplay, setCurrDisplay] = useState(<Tasks />)
  const [tasksClass, setTasksClass] = useState("active")
  const [notesClass, setNotesClass] = useState("")
  const [profileClass, setProfileClass] = useState("")


  const resetAllClass = () => {
    setTasksClass("")
    setNotesClass("")
    setProfileClass("")
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
  }
  const handleTasks = () => {
    console.log(userID)
    resetAllClass()
    setTasksClass("active")
    setCurrDisplay(<Tasks userID={userID} />)
  }
  const handleNotes = () => {
    resetAllClass()
    setNotesClass("active")
    setCurrDisplay(<Notes />)
  }
  const handleProfile = () => {
    resetAllClass()
    setProfileClass("active")
    setCurrDisplay(<Profile />)
  }

  return (
    <>
    <div>
      <header className="header">
        <div className="logo">Taskify</div>
        <nav>
          <a href="#" className={tasksClass} onClick={handleTasks}>Tasks</a>
          <a href="#" className={notesClass} onClick={handleNotes}>Notes</a>
          <a href="#" className={profileClass} onClick={handleProfile}>Profile</a>
        </nav>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </header>      
    </div>
    {currDisplay}
    </>
  );
};

export default HomePage;
