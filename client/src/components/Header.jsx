import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useRef } from 'react'


const Header = () => {

  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput("")
    inputRef.current.value = ""
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>

        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full  text-sm text-primary'>
          <p>A place for people who love tech</p>
          <img src={assets.star_icon} className='w-4.5' alt="star icon" />
        </div>

        <h1 className='text-2xl sm:text-5xl font-semibold sm:leading-16 text-gray-700'>
          <span className='text-primary'>Gidipost</span>: Your Hub <br /> for Everything Tech
        </h1>

        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
          Gidipost covers the latest in tech from programming and software development to AI, gadgets, news, and tech opportunities. It's built for developers, students, and anyone interested in the tech space.
        </p>

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
