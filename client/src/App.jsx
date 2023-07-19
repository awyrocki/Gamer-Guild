import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./components/Login/Login"
import Forgot from "./components/Forgot/Forgot"
import Linking from './components/Steam/Linking';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/Recover' element={ <Forgot /> } />
          <Route path='/Home' element={ <Dashboard /> } />
          <Route path={`/Linking`} element={ <Linking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
