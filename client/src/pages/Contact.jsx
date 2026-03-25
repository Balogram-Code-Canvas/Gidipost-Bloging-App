import React, { useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'
import SEO from '../components/SEO'

const Contact = () => {

  const formRef = useRef()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    emailjs.sendForm(
      'service_opx26vh',
      'template_23r9z1p',
      formRef.current,
      'C8cwddSj8v-fXWgH2'
    )
    .then(() => {
      toast.success('Message sent successfully! We will get back to you soon.')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setLoading(false)
    })
    .catch((error) => {
      toast.error('Failed to send message. Please try again.')
      console.log(error)
      setLoading(false)
    })
  }

  return (
    <div className='relative bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300'>

      <SEO
        title='Contact Us'
        description='Get in touch with the Gidipost team. We would love to hear from you.'
      />

      <img
        src={assets.gradientBackground}
        alt=""
        className='absolute -top-[50px] -z-[1] opacity-50 dark:opacity-10'
      />

      <Navbar />

      <div className='max-w-3xl mx-auto px-5 py-20 text-gray-600 dark:text-gray-400'>

        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
            Contact Us
          </h1>
          <p className='text-gray-500 dark:text-gray-400 max-w-lg mx-auto'>
            Have a question, suggestion, or just want to say hello?
            We would love to hear from you. Fill out the form below
            and we will get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12'>
          <div className='text-center p-6 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg'>
            <p className='text-2xl mb-2'>📧</p>
            <p className='font-semibold text-gray-800 dark:text-gray-100 mb-1'>Email</p>
            <p className='text-sm dark:text-gray-400'>tunde.agboke@gmail.com</p>
          </div>
          
          <a
            href='https://wa.me/2348140956485'
            target='_blank'
            rel='noreferrer'
            className='text-center p-6 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg hover:border-primary hover:scale-105 transition-all cursor-pointer block'
          >
            <p className='text-2xl mb-2'>💬</p>
            <p className='font-semibold text-gray-800 dark:text-gray-100 mb-1'>WhatsApp</p>
            <p className='text-sm dark:text-gray-400'>Chat with us on WhatsApp</p>
          </a>
          <div className='text-center p-6 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg'>
            <p className='text-2xl mb-2'>🏢</p>
            <p className='font-semibold text-gray-800 dark:text-gray-100 mb-1'>Company</p>
            <p className='text-sm dark:text-gray-400'>Gidipost News Hub</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-10'>
          <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6'>
            Send us a Message
          </h2>
          <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col sm:flex-row gap-5'>
              <div className='flex flex-col w-full'>
                <label className='mb-1 text-sm font-medium dark:text-gray-300'>Your Name</label>
                <input
                  type='text'
                  name='from_name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='John Doe'
                  required
                  className='border border-gray-300 dark:border-gray-600 rounded p-3 outline-none focus:border-primary transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                />
              </div>
              <div className='flex flex-col w-full'>
                <label className='mb-1 text-sm font-medium dark:text-gray-300'>Your Email</label>
                <input
                  type='email'
                  name='from_email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='john@example.com'
                  required
                  className='border border-gray-300 dark:border-gray-600 rounded p-3 outline-none focus:border-primary transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium dark:text-gray-300'>Subject</label>
              <input
                type='text'
                name='subject'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder='How can we help you?'
                required
                className='border border-gray-300 dark:border-gray-600 rounded p-3 outline-none focus:border-primary transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
              />
            </div>
            <div className='flex flex-col'>
              <label className='mb-1 text-sm font-medium dark:text-gray-300'>Message</label>
              <textarea
                name='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Write your message here...'
                required
                rows={6}
                className='border border-gray-300 dark:border-gray-600 rounded p-3 outline-none focus:border-primary transition-all resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='bg-primary text-white font-medium py-3 px-8 rounded-full hover:scale-105 transition-all cursor-pointer w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className='text-center mt-12'>
          <p className='font-semibold text-gray-800 dark:text-gray-100 mb-4'>
            Follow us on social media
          </p>
          <div className='flex justify-center gap-4'>
            <a
              href='https://www.instagram.com/gidipost'
              target='_blank'
              rel='noreferrer'
              className='px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm dark:text-gray-400 hover:border-primary hover:text-primary transition-all'
            >
              Instagram
            </a>
            <a
              href='https://www.facebook.com/gidipost'
              target='_blank'
              rel='noreferrer'
              className='px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm dark:text-gray-400 hover:border-primary hover:text-primary transition-all'
            >
              Facebook
            </a>
            <a
              href='https://wa.me/2348140956485'
              target='_blank'
              rel='noreferrer'
              className='px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm dark:text-gray-400 hover:border-primary hover:text-primary transition-all'
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Contact