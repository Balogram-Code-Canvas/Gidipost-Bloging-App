import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {

  const { title, description, category, image, _id } = blog
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className='w-full rounded-lg overflow-hidden shadow hover:scale-105 hover:shadow-lg duration-300 cursor-pointer bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
    >
      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        className='aspect-video w-full object-cover'
      />

      {/* Category Badge */}
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 dark:bg-primary/30 rounded-full text-primary text-xs'>
        {category}
      </span>

      {/* Content */}
      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900 dark:text-gray-100'>
          {title}
        </h5>
        <p
          className='mb-3 text-xs text-gray-600 dark:text-gray-400'
          dangerouslySetInnerHTML={{ "__html": description.slice(0, 80) }}
        />
      </div>
    </div>
  )
}

export default BlogCard