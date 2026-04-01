import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const { axios, token } = useAppContext()

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: token }
      })
      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      fetchDashboard()
    }
  }, [token])

  const stats = [
    {
      icon: assets.dashboard_icon_1,
      value: dashboardData.blogs,
      label: 'Total Blogs',
      color: 'bg-blue-50 dark:bg-blue-900/20',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40'
    },
    {
      icon: assets.dashboard_icon_2,
      value: dashboardData.comments,
      label: 'Comments',
      color: 'bg-green-50 dark:bg-green-900/20',
      iconBg: 'bg-green-100 dark:bg-green-900/40'
    },
    {
      icon: assets.dashboard_icon_3,
      value: dashboardData.drafts,
      label: 'Drafts',
      color: 'bg-orange-50 dark:bg-orange-900/20',
      iconBg: 'bg-orange-100 dark:bg-orange-900/40'
    },
  ]

  return (
    <div className='flex-1 p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen'>

      {/* Page Title */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-100'>
          Dashboard
        </h1>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
          Welcome back! Here is what is happening with Gidipost.
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10'>
        {stats.map(({ icon, value, label, color, iconBg }) => (
          <div
            key={label}
            className={`${color} rounded-xl p-6 flex items-center gap-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all`}
          >
            <div className={`${iconBg} p-3 rounded-xl`}>
              <img src={icon} alt={label} className='w-7 h-7' />
            </div>
            <div>
              <p className='text-3xl font-bold text-gray-800 dark:text-gray-100'>
                {value}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-0.5'>
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Blogs Table */}
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>

        {/* Table Header */}
        <div className='flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-700'>
          <img src={assets.dashboard_icon_4} alt="Latest Blogs" className='w-5 h-5' />
          <h2 className='font-semibold text-gray-700 dark:text-gray-200'>
            Latest Blogs
          </h2>
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-600 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700/50'>
              <tr>
                <th className='px-6 py-3 text-left'>#</th>
                <th className='px-6 py-3 text-left'>Blog Title</th>
                <th className='px-6 py-3 text-left max-sm:hidden'>Date</th>
                <th className='px-6 py-3 text-left max-sm:hidden'>Status</th>
                <th className='px-6 py-3 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
              {dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='px-6 py-12 text-center text-gray-400 dark:text-gray-500'>
                    <p className='text-4xl mb-3'>📭</p>
                    <p className='text-sm'>No blog posts yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}

export default Dashboard