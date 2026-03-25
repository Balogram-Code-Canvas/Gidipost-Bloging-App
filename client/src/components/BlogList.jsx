import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import { motion } from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {

  const [menu, setMenu] = useState("All")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { blogs, input } = useAppContext()

  const filteredBlogs = () => {
    if (input === '') {
      return blogs
    }
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase())
    )
  }

  return (
    <div>

      {/* Desktop Categories - hidden on mobile */}
      <div className='hidden sm:flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 dark:text-gray-400 ${menu === item && 'text-white dark:text-white px-4 pt-0.5'}`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId='underline'
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className='absolute left-0 right-0 top-0 h-7 -z-[1] bg-primary rounded-full'
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Category Dropdown - hidden on desktop */}
      <div className='sm:hidden my-6 mx-4 relative'>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className='w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300 shadow-sm'
        >
          <div className='flex items-center gap-2'>
            <span>📂</span>
            <span>
              Category: <b className='text-primary'>{menu}</b>
            </span>
          </div>
          <span className={`transition-transform duration-300 text-xs ${dropdownOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className='absolute left-0 right-0 top-[52px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden'>
            {blogCategories.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setMenu(item)
                  setDropdownOpen(false)
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-all border-b border-gray-100 dark:border-gray-700 last:border-none
                  ${menu === item
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                <div className='flex items-center justify-between'>
                  <span>{item}</span>
                  {menu === item && <span className='text-primary'>✓</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Blog Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {filteredBlogs()
          .filter((blog) => menu === "All" ? true : blog.category === menu)
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        }
      </div>

    </div>
  )
}

export default BlogList