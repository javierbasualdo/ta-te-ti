import { useState } from 'react'
import Desk from "./components/Desk/Desk";
import './App.css'

function App() {
  const [keyComponent, setKeyComponent] = useState(Math.random());

  function changeKey() {
    setKeyComponent(Math.random());
  }
  return (
    <main className="container">
      <Desk 
      key={keyComponent} 
      reload={changeKey}
      />
    </main>
  )
}

export default App
