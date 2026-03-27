import React, { useEffect, useState, useRef } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import { parse } from 'marked'

const EditBlog = () => {

  const { id } = useParams()
  const { axios, token } = useAppContext()
  const navigate = useNavigate()

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [isUpdating, setIsUpdating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Tech News')
  const [isPublished, setIsPublished] = useState(false)
  const [description, setDescription] = useState('')

  // ✅ Step 1: Fetch blog data first
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/api/blog/${id}`)
        if (data.success) {
          const blog = data.blog
          setTitle(blog.title)
          setSubTitle(blog.subTitle)
          setCategory(blog.category)
          setIsPublished(blog.isPublished)
          setPreviewImage(blog.image)
          setDescription(blog.description) // ✅ Store description in state
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setFetching(false)
      }
    }
    fetchBlog()
  }, [id])

  // ✅ Step 2: Initialize Quill AFTER data is fetched
  useEffect(() => {
    if (!fetching && editorRef.current) {
      if (!quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              ['blockquote', 'code-block'],
              ['link', 'image'],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['clean']
            ]
          }
        })
      }

      // ✅ Step 3: Set content after Quill is initialized
      if (description && quillRef.current) {
        quillRef.current.root.innerHTML = description
      }
    }
  }, [fetching, description])

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
      setIsUpdating(true)

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
      if (image) {
        formData.append('image', image)
      }

      const { data } = await axios.put(
        `/api/blog/update/${id}`,
        formData,
        { headers: { Authorization: token } }
      )

      if (data.success) {
        toast.success('Blog updated successfully!')
        navigate('/admin/listBlog')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  if (fetching) {
    return (
      <div className='flex-1 flex items-center justify-center bg-blue-50/50'>
        <div className='w-10 h-10 rounded-full border-2 border-t-primary animate-spin' />
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'
    >
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <h2 className='text-xl font-semibold text-gray-700 mb-6'>
          Edit Blog Post
        </h2>

        {/* Thumbnail */}
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : previewImage || assets.upload_area}
            alt=""
            className='mt-2 h-24 rounded cursor-pointer object-cover'
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id='image'
            hidden
          />
        </label>
        <p className='text-xs text-gray-400 mt-1'>
          Leave empty to keep existing image
        </p>

        {/* Title */}
        <p className='mt-4'>Blog Title</p>
        <input
          type="text"
          placeholder='Type here'
          required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={e => setTitle(e.target.value)}
          value={title}
        />

        {/* Subtitle */}
        <p className='mt-4'>Sub Title</p>
        <input
          type="text"
          placeholder='Type here'
          required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={e => setSubTitle(e.target.value)}
          value={subTitle}
        />

        {/* Description */}
        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef} />
          {loading && (
            <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
              <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin' />
            </div>
          )}
          <button
            disabled={loading}
            type='button'
            onClick={generateContent}
            className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'
          >
            Generate with AI
          </button>
        </div>

        {/* Category */}
        <p className='mt-4'>Blog Category</p>
        <select
          onChange={e => setCategory(e.target.value)}
          value={category}
          name="category"
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        {/* Publish */}
        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className='scale-125 cursor-pointer'
            onChange={e => setIsPublished(e.target.checked)}
          />
        </div>

        {/* Buttons */}
        <div className='flex gap-4 mt-8'>
          <button
            disabled={isUpdating}
            type='submit'
            className='w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm disabled:opacity-70'
          >
            {isUpdating ? 'Updating...' : 'Update Blog'}
          </button>
          <button
            type='button'
            onClick={() => navigate('/admin/listBlog')}
            className='w-40 h-10 border border-gray-300 text-gray-600 rounded cursor-pointer text-sm hover:bg-gray-50'
          >
            Cancel
          </button>
        </div>

      </div>
    </form>
  )
}

export default EditBlog