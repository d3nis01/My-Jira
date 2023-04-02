import { useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useAddNewStatusMutation } from "./statusesSlice";
import { selectAllStatuses, useGetStatusesQuery } from "./statusesSlice";

const AddStatusForm = ({ setStatusPop }) => {

    const [addNewStatus, { isLoading }] = useAddNewStatusMutation();

    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    let notFound = true;

    const onTitleChanged = e => setTitle(e.target.value)

    const allStatuses = useSelector(selectAllStatuses);

    allStatuses.map((status) => {if (status.title === title) { notFound = false; } });
    const canSave = [title, notFound].every(Boolean) && !isLoading;
    let foundAlert = !notFound ? <p>Name already in</p> : null

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await addNewStatus({ title }).unwrap()
                setTitle('')
                navigate('/')
                setStatusPop(false)
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    const handleBackgroundClick = () => { setStatusPop(false) }
    const handleFormClick = (event) => { event.stopPropagation(); }

    return (
        <div className="AddPostForm" onClick={handleBackgroundClick}>
        <div className="form-body" onClick={handleFormClick}>
                <form className="postform">
                    <label htmlFor="statusNem">Status name:</label>
                    <input
                        className="postform-title"
                        type="text"
                        id="statusNem"
                        name="statusNem"
                        value={title}
                        onChange={onTitleChanged}
                    />
                    <button
                        type="button"
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                    >Save Post</button>
                </form>
                {foundAlert}
            </div>
        </div>
    )
}
export default AddStatusForm