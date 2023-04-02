import { useState } from "react";
import { useSelector } from "react-redux";

import { useAddNewPostMutation, useChangeStatusMutation  } from "./postsSlice";
import { useGetStatusesQuery, selectAllStatuses } from "./statusesSlice";

const AddPostForm = ({ setNewPostPopUp }) => {

    const [addNewPost, { isLoading }] = useAddNewPostMutation()

    const allStatuses = useSelector(selectAllStatuses);

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState('')

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onStatusChanged = e => setStatus(e.target.value)


    const canSave = [title, content].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await addNewPost({ title, body: content, currentStatus: status}).unwrap()
                setTitle('')
                setContent('')
                setStatus('')
                setNewPostPopUp(false)
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    const statusOptions = allStatuses.map(option => (
        <option key={option.id} value={option.title}>
            {option.title}
        </option>
    ))
    
    const handleBackgroundClick = () => { setNewPostPopUp(false) }

    const handleFormClick = (event) => { event.stopPropagation(); }

    return (
        <div className="AddPostForm" onClick={handleBackgroundClick}>
        <div className="form-body" onClick={handleFormClick}>
            <h2>Add a New Post</h2>
            <form className="postform">
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    className="postform-title"
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Status:</label>
                <select id="postAuthor" value={status} onChange={onStatusChanged}>
                    <option value=""></option>
                    {statusOptions}

                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    className="postform-textarea"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </div>
        </div>
    )
}
export default AddPostForm