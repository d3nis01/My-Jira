import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

const SinglePost = () => {

  const navigate = useNavigate();

  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)))

  const handleBackgroundClick = () => {
    navigate('/');
  }

const handleFormClick = (event) => { event.stopPropagation(); }

const handleEditPost = () => { navigate(`/post/edit/${postId}`) }

  return (
    <div className="AddPostForm" onClick={handleBackgroundClick}>
        <div className="form-body" onClick={handleFormClick}>
            <h1 className='singlepost-title'>{post.title}</h1>
            <h2 className='singlepost-status'>Current status: {post.currentStatus}</h2>
            <div classsName='singlepost' style={{ paddingLeft: "20px" }}>
              <div className='singlepost-content'>Task content:</div>
              <div className='singlepost-body'>&nbsp;&nbsp;&nbsp;&nbsp;{post.body}</div>
            </div>
            <button 
              onClick={handleEditPost}
              className='editpost-button'  
            >Edit post</button>
        </div>
        </div>
  )
}

export default SinglePost