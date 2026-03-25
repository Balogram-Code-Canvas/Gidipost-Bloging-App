import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300'>
      <SEO
        title='Home'
        description='Gidipost covers the latest in tech from programming and software development to AI, gadgets, news, and tech opportunities.'
      />
      <Navbar />
      <Header />
      <BlogList />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home