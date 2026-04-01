import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {

  const { token } = useAppContext()
  const navigate = useNavigate()
 
  const [menuOpen, setMenuOpen] = useState(false)

  // ✅ Hide login button on all public pages
  // Only show when logged in (token exists)
  const showDashboardButton = token

  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
  <div className="flex justify-between items-center py-5 px-6 sm:px-20 xl:px-32">
    {/* Your content here */}
  

      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Gidipost"
        className='w-28 sm:w-36 cursor-pointer'
      />

      {/* Desktop Nav Links */}
      <div className='hidden md:flex items-center gap-8'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `text-sm font-medium transition-all hover:text-primary ${
              isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
            }`
          }
        >
          Blog
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            `text-sm font-medium transition-all hover:text-primary ${
              isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
            }`
          }
        >
          About Us
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            `text-sm font-medium transition-all hover:text-primary ${
              isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
            }`
          }
        >
          Contact Us
        </NavLink>
      </div>

      {/* Right Side */}
      <div className='flex items-center gap-4'>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* ✅ Only show Dashboard button when logged in */}
        {showDashboardButton && (
          <button
            onClick={() => navigate('/admin')}
            className='hidden md:flex items-center gap-1 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2 hover:scale-105 transition-all'
          >
            Dashboard
            <img src={assets.arrow} className='w-3' alt="arrow" />
          </button>
        )}

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden flex flex-col gap-1.5 cursor-pointer'
        >
          <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden absolute top-[70px] left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 px-8 py-6 flex flex-col gap-5'>
          <NavLink
            to='/'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition-all hover:text-primary ${
                isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
              }`
            }
          >
            Blog
          </NavLink>
          <NavLink
            to='/about'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition-all hover:text-primary ${
                isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to='/contact'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition-all hover:text-primary ${
                isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
              }`
            }
          >
            Contact Us
          </NavLink>

          {/* ✅ Only show Dashboard button in mobile menu when logged in */}
          {showDashboardButton && (
            <button
              onClick={() => {
                navigate('/admin')
                setMenuOpen(false)
              }}
              className='flex items-center gap-1 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2 w-fit hover:scale-105 transition-all'
            >
              Dashboard
              <img src={assets.arrow} className='w-3' alt="arrow" />
            </button>
          )}
        </div>
      )}

    </div>
</div>
  )
}

export default Navbar