import { useEffect, useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import Home from './components/Home'
import toast from 'react-hot-toast'
import Landing from './components/Landing'


function App() {
  // useEffect(()=>{
  //   toast.error("Arre Baba")
  // },[])
  return (
    <div>
      {
        localStorage.name?<Home/>:<Landing/>
      }
        

    </div>
  )
}

export default App
