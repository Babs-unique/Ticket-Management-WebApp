import React, { useState, useEffect } from 'react';
import { useCreateTicketMutation, useUpdateTicketMutation } from '../feature/ticketApiSlice';
import { toast } from 'react-toastify';
import Loader from './loader';

export const PopUp = ({ addTicket, modalAction, selectedTicket, closePopUp }) => {
const [create, { isLoading: isCreating }] = useCreateTicketMutation();
const [update, { isLoading: isUpdating }] = useUpdateTicketMutation();

const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'easy',
});

useEffect(() => {
    if (modalAction === 'edit' && selectedTicket) {
    setFormData({
        title: selectedTicket.title || '',
        description: selectedTicket.description || '',
        status: selectedTicket.status || 'open',
        priority: selectedTicket.priority || 'easy',
    });
    } else {
    setFormData({
        title: '',
        description: '',
        status: 'open',
        priority: 'easy',
    });
    }
}, [modalAction, selectedTicket]);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    if (modalAction === 'create') {
        await create(formData).unwrap();
        toast.success('Ticket Created Successfully');
    } else if (modalAction === 'edit') {
        await update({ id: selectedTicket._id, ...formData }).unwrap();
        toast.success('Ticket Updated Successfully');
    }

    addTicket();
    closePopUp(); 
    } catch (err) {
    console.error(err);
    toast.error(err?.data?.message || 'Operation failed');
    }
};

return (
    <div className='popup-ticket'>
    <div className='ticket-header'>
        <h3>{modalAction === 'edit' ? 'Edit Ticket' : 'Create New Ticket'}</h3>
        <i onClick={closePopUp}></i>
    </div>
    <form onSubmit={handleSubmit} className='form-popUp'>
        <div className='title-popup'>
        <label htmlFor='title'>Title</label>
        <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        </div>

        <div className='descript-popup'>
        <label htmlFor='description'>Description</label>
        <textarea
            name='description'
            id='description'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        </div>

        <div className='status'>
        <div>
            <label htmlFor='status'>Status</label>
            <select
            name='status'
            id='status'
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
            <option value='open'>Open</option>
            <option value='in-progress'>In Progress</option>
            <option value='closed'>Closed</option>
            </select>
        </div>

        <div>
            <label htmlFor='priority'>Priority</label>
            <select
            name='priority'
            id='priority'
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
            </select>
        </div>
        </div>

        <div className='popup-buttons'>
        <button type='button' onClick={closePopUp}>Cancel</button>
        {(isCreating || isUpdating) 
            ? <button className='loading'><Loader /></button> 
            : <button type='submit'>Save Ticket</button>
        }
        </div>
    </form>
    </div>
);
};