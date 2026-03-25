import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useAppContext } from '../context/AppContext'

const ThemeToggle = () => {

  const { theme, toggleTheme } = useAppContext()

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300'
      aria-label='Toggle Dark Mode'
    >
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  )
}

export default ThemeToggle