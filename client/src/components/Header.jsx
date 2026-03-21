import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useRef } from 'react'


const Header = () => {

  const {setInput, input} = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = ()=>{
    setInput("")
    inputRef.current.value = ""
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>

        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full  text-sm text-primary'>
        <p>The Dev-Centric Blog Platform</p>
        <img src={assets.star_icon} className='w-2.5' alt="star icon" />
        </div>

        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'> <span className='text-primary'>Blogging</span> Redefined for <br /> Developers</h1>

        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>Blogram connects developers across the globe, offering insightful articles, coding resources, and shared assets to fuel innovation, learning, and collaboration.</p>

        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
            <input ref={inputRef} type="text" placeholder='Search for blogs' required className='w-full pl-4 outline-none' />
            <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
        </form>

      </div>
      <div className='text-center'>
        {input && (
  <button
    onClick={onClear}
    className="backdrop-blur-sm bg-white/30 border border-white/40 text-primary text-xs font-medium py-1.5 px-4 rounded-full hover:bg-white/40 hover:scale-105 transition-all duration-300 shadow-sm cursor-pointer"
  >
    Clear Search
  </button>
)}
      </div>
      <img
        src={assets.gradientBackground}
        alt="gradient background"
        className="absolute -top-[50px] -z-[1] opacity-50"
      />
    </div>
  )
}

export default Header
