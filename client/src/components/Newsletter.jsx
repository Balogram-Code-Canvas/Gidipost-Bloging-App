import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
        Stay Updated with Gidipost!
      </h1>
      <p className='text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6'>
        Subscribe and never miss a post. Get the latest in tech,
        software development, AI, gadgets, scholarships, and
        trending news delivered straight to your inbox.
      </p>
      <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
        <input
          className='border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3'
          type="email"
          placeholder='Enter your email'
          required
        />
        <button
          type='submit'
          className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter