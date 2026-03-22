import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {

  const { token } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // ✅ Check if current page is home
  const isHome = location.pathname === '/'

  return (
    <div className='relative flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>

      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Gidipost"
        className='w-32 sm:w-44 cursor-pointer'
      />

      {/* Desktop Nav Links */}
      <div className='hidden md:flex items-center gap-8'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `text-sm font-medium transition-all hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'
            }`
          }
        >
          Blog
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            `text-sm font-medium transition-all hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'
            }`
          }
        >
          About Us
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            `text-sm font-medium transition-all hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'
            }`
          }
        >
          Contact Us
        </NavLink>
      </div>

      {/* Right Side - Hide Login button on Home page */}
      <div className='flex items-center gap-4'>
        {(!isHome || token) && (
          <button
            onClick={() => navigate('/admin')}
            className='hidden md:flex items-center gap-1 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2 hover:scale-105 transition-all'
          >
            {token ? 'Dashboard' : 'Login'}
            <img src={assets.arrow} className='w-3' alt="arrow" />
          </button>
        )}

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden flex flex-col gap-1.5 cursor-pointer'
        >
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden absolute top-[70px] left-0 right-0 bg-white shadow-lg z-50 px-8 py-6 flex flex-col gap-5'>
          <NavLink
            to='/'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition-all hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'
              }`
            }
          >
            Blog
          </NavLink>
          <NavLink
            to='/about'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition-all hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to='/contact'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition-all hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'
              }`
            }
          >
            Contact Us
          </NavLink>

          {/* Hide Login button on Home page in mobile menu too */}
          {!isHome && (
            <button
              onClick={() => {
                navigate('/admin')
                setMenuOpen(false)
              }}
              className='flex items-center gap-1 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2 w-fit hover:scale-105 transition-all'
            >
              {token ? 'Dashboard' : 'Login'}
              <img src={assets.arrow} className='w-3' alt="arrow" />
            </button>
          )}
        </div>
      )}

    </div>
  )
}

export default Navbar