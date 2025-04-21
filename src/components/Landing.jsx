import React from 'react'

function Landing() {
    const SubmitHandle=(e) => {
        if(e.key==='Enter'){
            localStorage.setItem('name',e.target.value)
            window.location.reload();

        }

    }
  return (
    <div className="w-screen h-screen bg-cover bg-center bg-[url('https://res.cloudinary.com/decks92gf/image/upload/v1745258339/photo-1514527893004-f77d3d773644_xoh84g.jpg')]">
        <div className='w-full flex flex-col text-[#fff] gap-3 items-center justify-center h-full bg-[#00000060]'>
            <div className='md:text-6xl  text-4xl font-bold uppercase'>Hello !</div>
            <div className='md:text-6xl  text-3xl font-bold uppercase'>What's Your Name?</div>
            <input onKeyDown={(e)=>SubmitHandle(e)} className='text-3xl w-1/3  border-[#fff] border-b-2 ring-[#fff] focus:outline-none ' type="text" />
        </div>
      
    </div>
  )
}

export default Landing
