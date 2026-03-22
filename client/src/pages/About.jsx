import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const About = () => {

  const navigate = useNavigate()

  return (
    <div className='relative'>
      <img
        src={assets.gradientBackground}
        alt=""
        className='absolute -top-[50px] -z-[1] opacity-50'
      />

      <Navbar />

      <div className='max-w-4xl mx-auto px-5 py-20 text-gray-600'>

        {/* Hero Section */}
        <div className='text-center mb-16'>
          <p className='text-primary font-medium mb-4'>About Us</p>
          <h1 className='text-3xl sm:text-5xl font-bold text-gray-800 mb-6'>
            We are <span className='text-primary'>Gidipost</span>
          </h1>
          <p className='text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed'>
            Your go-to platform for everything tech — from software 
            development and programming to AI, gadgets, tech news, 
            scholarships, and beyond.
          </p>
        </div>

        {/* Mission Section */}
        <div className='bg-primary/5 border border-primary/20 rounded-2xl p-8 sm:p-12 mb-16'>
          <div className='text-center'>
            <p className='text-primary font-medium mb-3'>Our Mission</p>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6'>
              Making Tech Knowledge Accessible to Everyone
            </h2>
            <p className='text-gray-500 max-w-2xl mx-auto leading-relaxed'>
              At Gidipost, we believe that knowledge should be free and 
              accessible to everyone. Our mission is to provide high-quality, 
              insightful, and up-to-date tech content that empowers developers, 
              students, and tech enthusiasts worldwide to learn, grow, and 
              stay ahead in the ever-evolving world of technology.
            </p>
          </div>
        </div>

        {/* What We Cover Section */}
        <div className='mb-16'>
          <div className='text-center mb-10'>
            <p className='text-primary font-medium mb-3'>What We Cover</p>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>
              Everything You Need to Know About Tech
            </h2>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

            <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all'>
              <p className='text-3xl mb-4'>💻</p>
              <h3 className='font-semibold text-gray-800 mb-2'>Dev & Code</h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                Tutorials, tips, and insights on software development 
                and programming languages.
              </p>
            </div>

            <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all'>
              <p className='text-3xl mb-4'>🤖</p>
              <h3 className='font-semibold text-gray-800 mb-2'>AI & Tools</h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                The latest in artificial intelligence, machine learning, 
                and developer productivity tools.
              </p>
            </div>

            <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all'>
              <p className='text-3xl mb-4'>📱</p>
              <h3 className='font-semibold text-gray-800 mb-2'>Phones & Gadgets</h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                Reviews, news, and updates on the latest phones, 
                gadgets, and consumer technology.
              </p>
            </div>

            <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all'>
              <p className='text-3xl mb-4'>📰</p>
              <h3 className='font-semibold text-gray-800 mb-2'>Tech News</h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                Breaking tech news, industry updates, and trending 
                stories from around the world.
              </p>
            </div>

            <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all'>
              <p className='text-3xl mb-4'>🎓</p>
              <h3 className='font-semibold text-gray-800 mb-2'>Scholarships</h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                Tech scholarships, learning opportunities, and 
                resources to help you advance your career.
              </p>
            </div>

            <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all'>
              <p className='text-3xl mb-4'>🔥</p>
              <h3 className='font-semibold text-gray-800 mb-2'>Trending</h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                The hottest topics and most talked about stories 
                in the tech world right now.
              </p>
            </div>

            <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all'>
              <p className='text-3xl mb-4'>🛸</p>
              <h3 className='font-semibold text-gray-800 mb-2'>ETs & Science</h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                Exploring the universe, extraterrestrial discoveries, 
                and the latest in science and space.
              </p>
            </div>

            <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all'>
              <p className='text-3xl mb-4'>🌍</p>
              <h3 className='font-semibold text-gray-800 mb-2'>And More</h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                We are constantly expanding our coverage to bring 
                you the best of everything tech.
              </p>
            </div>

          </div>
        </div>

        {/* Why Gidipost Section */}
        <div className='mb-16'>
          <div className='text-center mb-10'>
            <p className='text-primary font-medium mb-3'>Why Gidipost</p>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>
              Why Millions of Tech Lovers Choose Us
            </h2>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>

            <div className='text-center p-6'>
              <p className='text-4xl mb-4'>✍🏽</p>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Quality Content
              </h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                Every post on Gidipost is carefully written and 
                reviewed to ensure accuracy, clarity, and value.
              </p>
            </div>

            <div className='text-center p-6'>
              <p className='text-4xl mb-4'>⚡</p>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Always Up to Date
              </h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                We stay on top of the latest trends and news so 
                you never miss what matters in tech.
              </p>
            </div>

            <div className='text-center p-6'>
              <p className='text-4xl mb-4'>🌍</p>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Built for Everyone
              </h3>
              <p className='text-sm text-gray-500 leading-relaxed'>
                Whether you are a seasoned developer or just 
                starting your tech journey — Gidipost is for you.
              </p>
            </div>

          </div>
        </div>

        {/* About the Founder */}
        <div className='bg-white border border-gray-100 shadow-sm rounded-2xl p-8 sm:p-12 mb-16'>
          <div className='text-center mb-8'>
            <p className='text-primary font-medium mb-3'>The Team</p>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>
              Built by Developers for Tech Lovers
            </h2>
          </div>
          <div className='flex flex-col sm:flex-row items-center gap-8'>
            <div className='w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-4xl flex-shrink-0'>
              👨🏽‍💻
            </div>
            <div>
              <h3 className='text-xl font-bold text-gray-800 mb-1'>
                Babatunde Adewale Agboke
              </h3>
              <p className='text-primary text-sm font-medium mb-3'>
                Founder & Lead Developer — Balogram Studio
              </p>
              <p className='text-gray-500 leading-relaxed'>
                Gidipost was created by Babatunde Adewale Agboke, a 
                passionate Frontend Developer and founder of Balogram Studio. 
                With a deep love for technology and a vision to make tech 
                knowledge accessible to everyone worldwide, Gidipost was 
                born as a platform where developers, students, and tech 
                enthusiasts can come to learn, share, and grow together.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center bg-primary rounded-2xl p-10 sm:p-16'>
          <h2 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
            Ready to Explore?
          </h2>
          <p className='text-white/80 max-w-lg mx-auto mb-8'>
            Join thousands of tech lovers who read Gidipost every day. 
            Explore our latest posts and stay ahead in the world of tech.
          </p>
          <button
            onClick={() => navigate('/')}
            className='bg-white text-primary font-semibold px-8 py-3 rounded-full hover:scale-105 transition-all cursor-pointer'
          >
            Explore Gidipost
          </button>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default About