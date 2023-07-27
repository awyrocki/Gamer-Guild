import './App.css';
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link, redirect, Navigate, useNavigate } from 'react-router-dom';
import Login from "./components/Login/Login"
import Forgot from "./components/Forgot/Forgot"
import Nav from './components/Nav/Nav';
import UserProfile from './components/UserProfile/UserProfile';
import Settings from './components/Settings/Settings';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
function App() {

  const [ logoutUser, setLogoutUser ] = useState(false)
  const session = localStorage.getItem("session")

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
  localStorage.setItem("session", false)
    setLogoutUser(true)
    setTimeout(() => localStorage.clear())
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
          <Route path={'/User'} element={ <UserProfile /> } />
          <Route path={'/Settings'} element={ <Settings /> } />
          <Route path='/About' element={ <About /> } />
          <Route path='/Contact' element={ <Contact /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
