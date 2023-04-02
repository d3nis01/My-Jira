import { useState } from "react";
import { useSelector } from "react-redux";

import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation, useChangeStatusMutation  } from "../posts/postsSlice";
import { useAddNewUserMutation } from "./usersSlice";

const AddUserForm = ({ setUserPop }) => {
    const [addNewUser, { isLoading }] = useAddNewUserMutation();

    // const navigate = useNavigate()

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [userId, setUserId] = useState('');

    const users = useSelector(selectAllUsers)

    const onNameChanged = e => setName(e.target.value)
    const onMailChanged = e => setMail(e.target.value);
    const onPhoneChanged = e => setPhone(e.target.value);
    const onAdressChanged = e => setAdress(e. target.value);
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [name, mail, phone].every(Boolean) && !isLoading;

    const onSaveUserClicked = async () => {
        if (canSave) {
            try {
                await addNewUser({ name, mail, adress }).unwrap()
                setName('')
                setMail('')
                setPhone('')
                setAdress('')
                setUserId('')
                setUserPop(false);
                // navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    const handleBackgroundClick = () => {
        setUserPop(false);
    }

    const handleFormClick = (event) => {
        event.stopPropagation();
    }

    return (
        <div className="AddPostForm" onClick={handleBackgroundClick}>
        <div className="form-body" onClick={handleFormClick}>
            <h2>New user</h2>
            <form className="postform">
                <label htmlFor="userName">Name:</label>
                <input
                    className="postform-title"
                    type="text"
                    id="userName"
                    name="userName"
                    value={name}
                    onChange={onNameChanged}
                />
                <label htmlFor="userMail">Mail:</label>
                <input
                    className="postform-title"
                    type="text"
                    id="userMail"
                    name="userMail"
                    value={mail}
                    onChange={onMailChanged}
                />
                <label htmlFor="userPhone">Phone number:</label>
                <input
                    className="postform-title"
                    type="text"
                    id="userPhone"
                    name="userPhone"
                    value={phone}
                    onChange={onPhoneChanged}
                />
                <label htmlFor="userAdress">Adress:</label>
                <textarea
                    className="postform-title"
                    type="text"
                    id="userAdress"
                    name="userAdress"
                    value={adress}
                    onChange={onAdressChanged}
                />
                <button
                    type="button"
                    onClick={onSaveUserClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </div>
        </div>
    )
}
export default AddUserForm