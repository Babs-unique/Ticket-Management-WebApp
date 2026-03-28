import React from 'react'
import { useDeleteTicketMutation } from '../feature/ticketApiSlice';
import {toast} from "react-toastify"
import Loader from './loader';
export const DeleteModal = ({ closeModal , selectedTicket}) => {
    const [deleteTicket , {isDeleting : isDeleting}] = useDeleteTicketMutation();

    const handleDelete = async () => {
        try {
        await deleteTicket(selectedTicket._id).unwrap();
        closeModal();
            toast.success("Ticket deleted successfully");
        } catch (error) {
        console.error('Error deleting ticket:', error);
            toast.error(error?.data?.message || 'Failed to delete ticket');
        }
    };

return (
        <div className='delete-modal'>
            <h2>Are you sure ? </h2>
            <p>This action cannot be undone.</p>
            <div className="delete-actions">
                <button className="confirm-delete" onClick={closeModal}>
                    Cancel
                </button>
                {isDeleting ? (
                    <Loader />
                ) : (
                    <button className="cancel-delete" onClick={handleDelete} disabled={isDeleting} >
                        Delete
                    </button>
                )}
            </div>
        </div>
  )
}
