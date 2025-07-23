
import React from 'react';
import AddNewNote from './components/addNewNote';
import { useState } from 'react'
import './App.css'
import Signup from './components/signup'
import HomePage from './components/homepage'
import Login from './components/login'

function App() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userID, setUserID] = useState("")

  return (
    <>
      {(isLoggedIn)?<HomePage setIsLoggedIn={setIsLoggedIn} userID={userID}/>:(isSignUp)?<Signup setIsSignUp={setIsSignUp} />:<Login setIsLoggedIn={setIsLoggedIn} setIsSignUp={setIsSignUp} setUserID={setUserID}/>}
    </>
  )
}

export default App;
