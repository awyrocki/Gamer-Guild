import './App.css';
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link, redirect, Navigate, useNavigate } from 'react-router-dom';
import Login from "./components/Login/Login"
import Forgot from "./components/Forgot/Forgot"
import Nav from './components/Nav/Nav';
import Settings from './components/Settings/Settings';
import About from './components/About/About';

function App() {

  const [ logoutUser, setLogoutUser ] = useState(false)
  const session = localStorage.getItem("session")
  const token = localStorage.getItem("token")

  // adds userName, userId, token and steamId to local storage
  function updateLocalStorage(newToken, newUserName, newUserId, newSteamId ) {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userName', newUserName);
    localStorage.setItem('id', newUserId);
    localStorage.setItem('steamID', newSteamId);
    localStorage.setItem("session", true)

  };

  // checks for valid session 
function loginRedirect() {
  if(session === "false" || session === null) {
    return <Navigate replace to="/" />
  } 
}

// forces re render on logout
useEffect(() => {
  
}, [logoutUser])

// logout
const logout = () => {
    localStorage.clear()
    setLogoutUser(true)
  }

function renderNav() {
  if (session === "false" || session === null) {
    return <></>
  } else {
    return <Nav logout={logout}/>
  }

  }

  return (
    <>
      <Router>
        {renderNav()}
        {loginRedirect()}
        <Routes>
          <Route path='/' element={ <Login updateLocalStorage={updateLocalStorage} /> } />
          <Route path='/Recover' element={ <Forgot /> } />
          <Route path={'/Home'} element={ <Dashboard logout={logout}/> } />
          <Route path={'/Settings'} element={ <Settings /> } />
          <Route path='/About' element={ <About /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
