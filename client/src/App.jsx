import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Contact from './pages/Contact'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import About from './pages/About'
import ScrollToTop from './components/ScrollToTop'
import './styles/richtext.css'
import 'quill/dist/quill.snow.css'

const App = () => {

  const { token } = useAppContext()

  return (
    <div>
      <Toaster />
      <ScrollToTop />
      <Routes>

        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />

        {/* Admin Routes */}
        <Route path='/admin' element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='listBlog' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App