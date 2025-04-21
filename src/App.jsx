import { useEffect, useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import Home from './components/Home'
import toast from 'react-hot-toast'


function App() {
  // useEffect(()=>{
  //   toast.error("Arre Baba")
  // },[])
  return (
    <div>

        <Home/>

    </div>
  )
}

export default App
