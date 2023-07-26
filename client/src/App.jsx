import './App.css';
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./components/Login/Login"
import Forgot from "./components/Forgot/Forgot"
import Nav from './components/Nav/Nav';
import Settings from './components/Settings/Settings';

function App() {
  let [token, setToken] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  
  let updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };
  


  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={ <Login updateLocalStorage={updateLocalStorage} /> } />
          <Route path='/Recover' element={ <Forgot /> } />
          <Route path={'/Home'} element={ <Dashboard /> } />
          <Route path={'/Settings'} element={ <Settings /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
