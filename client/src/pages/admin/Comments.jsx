import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {

  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const { axios, token } = useAppContext()

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments', {
        headers: { Authorization: token }
      })
      if (data.success) {
        setComments(data.comments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      fetchComments()
    }
  }, [token])

  const filteredComments = comments.filter((comment) => {
    if (filter === 'Approved') return comment.isApproved === true
    return comment.isApproved === false
  })

  return (
    <div className='flex-1 p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen'>

      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-100'>
          Comments
        </h1>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
          Manage and moderate comments from your readers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className='flex items-center gap-3 mb-6'>
        <button
          onClick={() => setFilter('Not Approved')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            filter === 'Not Approved'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-primary hover:text-primary'
          }`}
        >
          Pending
          {comments.filter(c => !c.isApproved).length > 0 && (
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
              filter === 'Not Approved'
                ? 'bg-white/30 text-white'
                : 'bg-orange-100 text-orange-600'
            }`}>
              {comments.filter(c => !c.isApproved).length}
            </span>
          )}
        </button>
        <button
          onClick={() => setFilter('Approved')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            filter === 'Approved'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-primary hover:text-primary'
          }`}
        >
          Approved
          {comments.filter(c => c.isApproved).length > 0 && (
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
              filter === 'Approved'
                ? 'bg-white/30 text-white'
                : 'bg-green-100 text-green-600'
            }`}>
              {comments.filter(c => c.isApproved).length}
            </span>
          )}
        </button>
      </div>

      {/* Comments Table */}
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-600 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700/50'>
              <tr>
                <th className='px-6 py-4 text-left'>Blog Title & Comment</th>
                <th className='px-6 py-4 text-left max-sm:hidden'>Date</th>
                <th className='px-6 py-4 text-left'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
              {filteredComments.length > 0 ? (
                filteredComments.map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComments={fetchComments}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={3} className='px-6 py-16 text-center'>
                    <p className='text-4xl mb-3'>
                      {filter === 'Approved' ? '✅' : '💬'}
                    </p>
                    <p className='text-gray-400 dark:text-gray-500 text-sm font-medium'>
                      {filter === 'Approved'
                        ? 'No approved comments yet'
                        : 'No pending comments'
                      }
                    </p>
                    <p className='text-gray-300 dark:text-gray-600 text-xs mt-1'>
                      {filter === 'Not Approved'
                        ? 'All comments have been reviewed'
                        : 'Approve comments to see them here'
                      }
                    </p>
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

export default Comments