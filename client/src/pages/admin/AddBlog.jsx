import React, { useEffect, useState, useRef } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'
import { parse } from 'marked'

const AddBlog = () => {

  const { axios } = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Tech News')
  const [isPublished, setIsPublished] = useState(false)

  const generateContent = async () => {
    if (!title) return toast.error('Please enter a title')
    try {
      setLoading(true)
      const { data } = await axios.post('/api/blog/generate', { prompt: title })
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setIsAdding(true)

      const content = quillRef.current.root.innerHTML
      const cleanContent = content
        .replace(/<p><br><\/p>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim()

      const blog = {
        title,
        subTitle,
        description: cleanContent,
        category,
        isPublished
      }

      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const { data } = await axios.post('/api/blog/add', formData)

      if (data.success) {
        toast.success(data.message)
        setImage(false)
        setTitle('')
        setSubTitle('')
        setCategory('Tech News')
        setIsPublished(false)
        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              ['blockquote', 'code-block'],
              ['link'],
              ['clean']
            ]
          }
        }
      })
    }
  }, [])

  return (
    <div className='flex-1 bg-gray-50 dark:bg-gray-900 overflow-y-auto'>
      <form onSubmit={onSubmitHandler}>
        <div className='max-w-3xl mx-auto py-8 px-4 sm:px-8'>

          <h2 className='text-xl font-semibold text-gray-700 dark:text-gray-200 mb-8'>
            Add New Blog Post
          </h2>

          {/* Upload Thumbnail */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Upload Thumbnail
            </label>
            <label htmlFor="image" className='cursor-pointer'>
              <div className='w-full max-w-xs h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:border-primary transition-all overflow-hidden'>
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="thumbnail"
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='text-center'>
                    <img
                      src={assets.upload_area}
                      alt="upload"
                      className='w-12 mx-auto mb-2 opacity-50'
                    />
                    <p className='text-sm text-gray-400'>Click to upload image</p>
                  </div>
                )}
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id='image'
                hidden
                required
              />
            </label>
          </div>

          {/* Blog Title */}
          <div className='mb-5'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Blog Title
            </label>
            <input
              type="text"
              placeholder='Enter blog title'
              required
              className='w-full p-3 border border-gray-300 dark:border-gray-600 outline-none rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:border-primary transition-all'
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
          </div>

          {/* Sub Title */}
          <div className='mb-5'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Sub Title
            </label>
            <input
              type="text"
              placeholder='Enter sub title'
              required
              className='w-full p-3 border border-gray-300 dark:border-gray-600 outline-none rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:border-primary transition-all'
              onChange={e => setSubTitle(e.target.value)}
              value={subTitle}
            />
          </div>

          
          {/* Blog Description */}
          <div className='mb-5'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Blog Description
            </label>

            {/* ✅ Editor Container */}
            <div className='max-w-4xl mx-auto border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm flex flex-col h-[60vh]'>

              {/* ✅ Quill Editor (Toolbar + Editor will be injected here) */}
              <div
                ref={editorRef}
                className='quill-fixed-editor flex flex-col h-full'
              />

              {/* ✅ AI Button Bar */}
              <div className='border-t border-gray-200 dark:border-gray-600 px-3 py-2 flex justify-between items-center bg-gray-50 dark:bg-gray-700'>
                <p className='text-xs text-gray-400 dark:text-gray-500'>
                  Use the code block button for code snippets
                </p>
                <button
                  disabled={loading}
                  type='button'
                  onClick={generateContent}
                  className='text-xs text-white bg-gray-800 dark:bg-gray-600 hover:bg-primary dark:hover:bg-primary px-4 py-1.5 rounded-md transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5'
                >
                  {loading ? (
                    <>
                      <span className='w-3 h-3 border border-t-white border-white/30 rounded-full animate-spin' />
                      Generating...
                    </>
                  ) : (
                    <>Generate with AI</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Blog Category & Publish Row */}
          <div className='flex flex-col sm:flex-row gap-5 mb-8'>

            {/* Category */}
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Blog Category
              </label>
              <select
                onChange={e => setCategory(e.target.value)}
                value={category}
                name="category"
                className='w-full p-3 border border-gray-300 dark:border-gray-600 outline-none rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:border-primary transition-all'
              >
                <option value="">Select Category</option>
                {blogCategories.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Publish */}
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Publish Status
              </label>
              <div className='flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 h-[50px]'>
                <input
                  type="checkbox"
                  id='publish'
                  checked={isPublished}
                  className='w-4 h-4 accent-primary cursor-pointer'
                  onChange={e => setIsPublished(e.target.checked)}
                />
                <label
                  htmlFor='publish'
                  className='text-sm text-gray-600 dark:text-gray-300 cursor-pointer'
                >
                  Publish immediately
                </label>
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <button
            disabled={isAdding}
            type='submit'
            className='w-full sm:w-auto px-10 py-3 bg-primary text-white rounded-lg cursor-pointer text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isAdding ? (
              <span className='flex items-center gap-2'>
                <span className='w-4 h-4 border-2 border-t-white border-white/30 rounded-full animate-spin' />
                Adding...
              </span>
            ) : (
              '+ Add Blog Post'
            )}
          </button>

        </div>
      </form>
    </div>
  )
}

export default AddBlog