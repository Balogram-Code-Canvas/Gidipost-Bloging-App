import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {

  const navigate = useNavigate()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>

      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>

        {/* Logo & Description */}
        <div>
          <img
            onClick={() => navigate('/')}
            src={assets.logo}
            alt="logo"
            className='w-32 sm:w-44 cursor-pointer'
          />
          <p className='max-w-[410px] mt-6'>
            Blogram is your trusted source for developer insights,
            coding tutorials, and curated resources focused on
            real-world learning.
          </p>

          {/* Social Links */}
          <div className='flex gap-3 mt-6'>
            <a
              href='https://github.com/Balogram-dev'
              target='_blank'
              rel='noreferrer'
              className='text-sm border border-gray-300 px-4 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all'
            >
              GitHub
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noreferrer'
              className='text-sm border border-gray-300 px-4 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all'
            >
              LinkedIn
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noreferrer'
              className='text-sm border border-gray-300 px-4 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all'
            >
              Instagram
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noreferrer'
              className='text-sm border border-gray-300 px-4 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all'
            >
              Twitter/X
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>

          {/* Quick Links */}
          <div>
            <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
              Quick Links
            </h3>
            <ul className='text-sm space-y-1'>
              <li>
                <Link to='/' className='hover:underline hover:text-primary transition-all'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/' className='hover:underline hover:text-primary transition-all'>
                  Blog
                </Link>
              </li>
              <li>
                <Link to='/contact' className='hover:underline hover:text-primary transition-all'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
              Categories
            </h3>
            <ul className='text-sm space-y-1'>
              <li>
                <Link
                  to='/?category=Development & Code'
                  className='hover:underline hover:text-primary transition-all'
                >
                  Development & Code
                </Link>
              </li>
              <li>
                <Link
                  to='/?category=AI & Tools'
                  className='hover:underline hover:text-primary transition-all'
                >
                  AI & Tools
                </Link>
              </li>
              <li>
                <Link
                  to='/?category=Resources & Assets'
                  className='hover:underline hover:text-primary transition-all'
                >
                  Resources & Assets
                </Link>
              </li>
              <li>
                <Link
                  to='/?category=Community & Trends'
                  className='hover:underline hover:text-primary transition-all'
                >
                  Community & Trends
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
              Follow Us
            </h3>
            <ul className='text-sm space-y-1'>
              <li>
                <a
                  href='https://github.com/Balogram-dev'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline hover:text-primary transition-all'
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href='https://www.linkedin.com/in/babatunde-agboke'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline hover:text-primary transition-all'
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href='https://twitter.com'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline hover:text-primary transition-all'
                >
                  Twitter/X
                </a>
              </li>
              <li>
                <a
                  href='https://www.youtube.com/@balogram_tech_talk'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline hover:text-primary transition-all'
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
              Legal
            </h3>
            <ul className='text-sm space-y-1'>
              <li>
                <Link
                  to='/privacy-policy'
                  className='hover:underline hover:text-primary transition-all'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  className='hover:underline hover:text-primary transition-all'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-4'>
        <p className='text-center text-sm md:text-base text-gray-500/80'>
          Copyright © 2025 Blogram — Balogram Studio. All rights reserved.
        </p>
        <div className='flex gap-4 text-sm text-gray-500/80'>
          <Link
            to='/privacy-policy'
            className='hover:text-primary transition-all'
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <Link
            to='/contact'
            className='hover:text-primary transition-all'
          >
            Contact
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Footer