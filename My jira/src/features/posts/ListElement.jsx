import './listview.css'
import React from 'react'
import { Link } from 'react-router-dom'

const ListElement = ({ post }) => {

  return (
    <Link to={`${post.id}`} className='navbar-link'>
        <div className='ListElement'>
            <h1 className='listelement-title'>{post.title}</h1>
            <h2 className='listelement-status'>Current status: {post.currentStatus}</h2>
            <div className='listelement-body'>{post.body}</div>
        </div>
    </Link>
  )
}

export default ListElement