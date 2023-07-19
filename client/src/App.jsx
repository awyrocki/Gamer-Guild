import { useState } from 'react';
import './App.css';
import Steam from './components/Steam/Steam';

function App() {

const [isLinked, setIsLinked ] = useState(false)

  return (
    <>
  <Steam  isLinked={isLinked} setIsLinked={setIsLinked}/>
    </>
  );
}

export default App;
