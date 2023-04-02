import React from 'react'

const PostElement = ({ post }) => {
  return (
    <div className='PostElement'>
      <div>{post.title}</div>
    </div>
  )
}

export default PostElement