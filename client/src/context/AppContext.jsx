import React from 'react'
import { createContext, useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export const AppProvider = ({ children }) => {

  const navigate = useNavigate()

  const [token, setToken] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [input, setInput] = useState("")

  // ✅ Dark Mode State
  const [theme, setTheme] = useState(
    localStorage.getItem('gidipost-theme') || 'light'
  )

  // ✅ Apply theme on load and change
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('gidipost-theme', theme)
  }, [theme])

  // ✅ Toggle function
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/all')
      if (data.success) {
        const sorted = data.blogs.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        )
        setBlogs(sorted)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      if (error.code !== 'ERR_NETWORK') {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    fetchBlogs()
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      axios.defaults.headers.common['Authorization'] = storedToken
    }
  }, [])

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs,
    theme,
    toggleTheme,  // ✅ expose toggle
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}