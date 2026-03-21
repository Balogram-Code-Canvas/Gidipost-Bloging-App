import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-4'>
  Stay Updated with Gidipost!
</h1>
<p className='text-gray-600 max-w-md mx-auto mb-6'>
  Subscribe and never miss a post. Get the latest in tech, 
  software development, AI, gadgets, scholarships, and 
  trending news delivered straight to your inbox.
</p>
      <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
        <input className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' type="text" placeholder='nter your email' required/>
        <button type='submit' className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletter
