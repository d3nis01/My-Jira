import React from 'react'
import {BsFillTrashFill} from 'react-icons/bs'
import { useDeleteStatusMutation } from './statusesSlice'
import { useNavigate } from 'react-router-dom'

const StatusDisplay = ({ status, canDelete }) => {

    const [deleteStatus] = useDeleteStatusMutation();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            if (canDelete === true) {
                await deleteStatus({ id: status.id }).unwrap()
            } else {
                alert(`Status '${status.title}' is not empty`)
            }
        } catch (err) {
            console.error('Failed to delete the post', err)
        }
    }

    return (
        <div className='StatusDisplay'>
            <div className='statusdisplay-title'>{status.title}</div>
            <BsFillTrashFill className='statusdisplay-icon' onClick={handleDelete} />
        </div>
  )
}

export default StatusDisplay