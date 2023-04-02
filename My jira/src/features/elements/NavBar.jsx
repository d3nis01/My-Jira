import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddPostForm from '../posts/AddPostForm';
import AddStatusForm from '../posts/AddStatusForm';
import AddUserForm from '../users/AddUserForm';
import './elements.css'

const NavBar = () => {
  const [newPostPopUp, setNewPostPopUp] = useState(false);
  const [statusPop, setStatusPop] = useState(false);
  const [userPop, setUserPop] = useState(false);
  
  const handleUserPop = () => {
    if (userPop === false) {
      setUserPop(true)
    }
  }

  const handleStatusPop = () => {
    if (statusPop === false) {
      setStatusPop(true)
    }
  }

  const handlePopUp = () => {
    if (newPostPopUp === false) {
      setNewPostPopUp(true);
    }
  }

  return (
    <header className='NavBar'>
      {newPostPopUp && <AddPostForm setNewPostPopUp={setNewPostPopUp} />}
      {statusPop && <AddStatusForm setStatusPop={setStatusPop} />}
      {userPop && <AddUserForm setUserPop={setUserPop} />}
        <div>
          <Link className='navbar-link' to={'/'}><h1 className='MyJira'>My jira</h1></Link>
        </div>
        <nav>
          <ul className='navbar-ul'>
          <Link className='navbar-link' to={`/status/list`}><li>See statuses</li></Link>
          <Link className='navbar-link' to={`/post/list`}><li>See list</li></Link>
          <li className='navbar-addpost' onClick={handleStatusPop}>New status</li>
          <li className='navbar-addpost' onClick={handlePopUp}>New post</li>
          <li className='navbar-addpost' onClick={handleUserPop}>New user</li>
          
          </ul>
        </nav>
    </header>
  )
}

export default NavBar