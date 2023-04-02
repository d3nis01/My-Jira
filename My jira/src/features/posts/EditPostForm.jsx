import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { useUpdatePostMutation, useDeletePostMutation } from "./postsSlice";
import { selectAllStatuses } from './statusesSlice';

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const [updatePost, { isLoading }] = useUpdatePostMutation()
    const [deletePost] = useDeletePostMutation()
    const allStatuses = useSelector(selectAllStatuses);

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    console.log(post)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const canSave = [title, content].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await updatePost({ id: post.id, title, body: content, currentStatus: post.currentStatus }).unwrap()

                setTitle('')
                setContent('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    const onDeletePostClicked = async () => {
        try {
            console.log(post)
            await deletePost({ id: post.id }).unwrap()

            setTitle('')
            setContent('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        }
    }

    const handleBackgroundClick = () => { navigate(`/post/${postId}`) }

    const handleFormClick = (event) => { event.stopPropagation(); }

    const statusOptions = allStatuses.map(option => (
        <option key={option.id} value={option.title}>
            {option.title}
        </option>
    ))

    return (
        <div className="AddPostForm" onClick={handleBackgroundClick}>
        <div className="form-body" onClick={handleFormClick}>
            <h2>Edit Post</h2>
            <form className='editpost-form'>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postStatus">Status:</label>
                <select id="postStatus" value={post.currentStatus}> 
                    {statusOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
                <button className="deleteButton"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>
            </form>
        </div>
        </div>
    )
}

export default EditPostForm