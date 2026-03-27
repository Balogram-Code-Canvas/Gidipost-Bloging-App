import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import '../styles/richtext.css'
import SEO from '../components/SEO'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const Blog = () => {

  const { id } = useParams()
  const { axios } = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id })
      if (data.success) {
        setComments(data.comments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/blog/add-comment', {
        blog: id,
        name,
        content
      })
      if (data.success) {
        toast.success(data.message)
        setName('')
        setContent('')
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // ✅ Fixed highlighting function
  const applyHighlighting = () => {
    const richText = document.querySelector('.rich-text')
    if (!richText) return

    // ✅ Target ALL pre tags whether they have code inside or not
    const preTags = richText.querySelectorAll('pre')

    preTags.forEach((pre) => {

      // Avoid duplicate processing
      if (pre.classList.contains('hljs-processed')) return
      pre.classList.add('hljs-processed')

      // ✅ Get the code content
      let codeEl = pre.querySelector('code')

      // ✅ If no <code> tag exists wrap content in one
      if (!codeEl) {
        const content = pre.innerHTML
        pre.innerHTML = ''
        codeEl = document.createElement('code')
        codeEl.innerHTML = content
        pre.appendChild(codeEl)
      }

      // ✅ Apply highlight.js
      hljs.highlightElement(codeEl)

      // ✅ Get detected language
      const language = codeEl.result?.language || 
                       codeEl.className.replace('language-', '').replace('hljs', '').trim() || 
                       'code'

      // ✅ Avoid adding duplicate wrapper
      if (pre.parentElement.classList.contains('code-block-wrapper')) return

      // ✅ Create wrapper
      const wrapper = document.createElement('div')
      wrapper.className = 'code-block-wrapper'

      // ✅ Create header
      const header = document.createElement('div')
      header.className = 'code-block-header'

      // ✅ Language label
      const langLabel = document.createElement('span')
      langLabel.className = 'code-lang'
      langLabel.innerText = language

      // ✅ Copy button
      const copyBtn = document.createElement('button')
      copyBtn.innerText = 'Copy'
      copyBtn.className = 'copy-btn'

      copyBtn.addEventListener('click', () => {
        const codeToCopy = codeEl.innerText
        navigator.clipboard.writeText(codeToCopy).then(() => {
          copyBtn.innerText = '✅ Copied!'
          copyBtn.classList.add('copied')
          setTimeout(() => {
            copyBtn.innerText = 'Copy'
            copyBtn.classList.remove('copied')
          }, 2000)
        }).catch(() => {
          // Fallback for browsers that don't support clipboard API
          const textArea = document.createElement('textarea')
          textArea.value = codeEl.innerText
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          copyBtn.innerText = '✅ Copied!'
          setTimeout(() => copyBtn.innerText = 'Copy', 2000)
        })
      })

      // ✅ Also highlight inline code elements
      header.appendChild(langLabel)
      header.appendChild(copyBtn)

      pre.parentNode.insertBefore(wrapper, pre)
      wrapper.appendChild(header)
      wrapper.appendChild(pre)
    })

    // ✅ Also highlight inline code tags
    const inlineCodes = richText.querySelectorAll('code:not(.hljs)')
    inlineCodes.forEach((code) => {
      if (!code.closest('pre')) {
        code.style.backgroundColor = '#1e1e2e'
        code.style.color = '#7dd3fc'
        code.style.padding = '0.15rem 0.4rem'
        code.style.borderRadius = '4px'
        code.style.fontSize = '0.875rem'
        code.style.fontFamily = 'monospace'
      }
    })
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [id])

  // ✅ Run after data loads with longer delay to ensure DOM is ready
  useEffect(() => {
  if (data) {
    setTimeout(() => {
      // ✅ Add this to see what HTML Quill generated
      const richText = document.querySelector('.rich-text')
      if (richText) {
        console.log('Rich text HTML:', richText.innerHTML)
        console.log('Pre tags found:', richText.querySelectorAll('pre').length)
        console.log('Code tags found:', richText.querySelectorAll('code').length)
      }
      applyHighlighting()
    }, 300)
  }
}, [data])

  return data ? (
    <div className='relative bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300'>

      <SEO
        title={data.title}
        description={data.subTitle}
        image={data.image}
        url={`https://gidipost-bloging-app.vercel.app/blog/${data._id}`}
        type='article'
      />

      <img
        src={assets.gradientBackground}
        alt=""
        className='absolute -top-[50px] -z-[1] opacity-50 dark:opacity-10'
      />

      <Navbar />

      <div className='text-center mt-20 text-gray-600 dark:text-gray-400'>
        <p className='text-primary py-4 font-medium'>
          Published on {moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 dark:text-gray-100'>
          {data.title}
        </h1>
        <h2 className='my-5 max-w-lg mx-auto text-center text-gray-600 dark:text-gray-400'>
          {data.subTitle}
        </h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 dark:bg-primary/20 font-medium text-primary'>
          Gidipost Admin
        </p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="blog" className='rounded-3xl mb-5 w-full' />

        <div
          className='rich-text max-w-3xl mx-auto'
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* Comments Section */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4 text-gray-800 dark:text-gray-100'>
            Comments ({comments.length})
          </p>
          <div className='flex flex-col gap-4'>
            {comments.map((item, index) => (
              <div
                key={index}
                className='relative bg-primary/5 dark:bg-gray-800 border border-primary/10 dark:border-gray-700 max-w-xl p-4 rounded text-gray-600 dark:text-gray-400'
              >
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt="" className='w-6' />
                  <p className='font-medium text-gray-800 dark:text-gray-200'>
                    {item.name}
                  </p>
                </div>
                <p className='text-sm max-w-md ml-8 dark:text-gray-400'>
                  {item.content}
                </p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500'>
                  {moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4 text-gray-800 dark:text-gray-100'>
            Add your comment
          </p>
          <form
            onSubmit={addComment}
            className='flex flex-col items-start gap-4 max-w-lg'
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder='Name'
              required
              className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder='Comment'
              className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded outline-none h-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
              required
            />
            <button
              type='submit'
              className='bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer'
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Buttons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4 text-gray-800 dark:text-gray-100'>
            Share this article on social media
          </p>
          <div className='flex gap-2'>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://gidipost-bloging-app.vercel.app/blog/${data._id}`}
              target='_blank'
              rel='noreferrer'
            >
              <img src={assets.facebook_icon} width={50} alt="Facebook" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=https://gidipost-bloging-app.vercel.app/blog/${data._id}&text=${data.title}`}
              target='_blank'
              rel='noreferrer'
            >
              <img src={assets.twitter_icon} width={50} alt="Twitter" />
            </a>
            <a
              href={`https://wa.me/?text=${data.title} https://gidipost-bloging-app.vercel.app/blog/${data._id}`}
              target='_blank'
              rel='noreferrer'
            >
              <img src={assets.googleplus_icon} width={50} alt="Share" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : <Loader />
}

export default Blog