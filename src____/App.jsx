import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { ReloadPrompt } from './pages/Prompt'
import NavBar from './pages/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ReloadPrompt />
      <NavBar />
      <Home />
    </>
  )
}

export default App
