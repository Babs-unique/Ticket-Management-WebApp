import React from 'react'
import { useCreateTicketMutation } from '../feature/ticketApiSlice'
import { toast } from 'react-toastify';
import Loader from './loader';
export const PopUp = ({closePopUp}) => {
    const [create , {isLoading}] = useCreateTicketMutation()


    const createTicket = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const title = formData.get("text");
        const description = formData.get("description");
        const status = formData.get("status");
        const priority = formData.get("priority")

        console.log({
            title,
            description,
            status,
            priority
        })
        console.log(formData)
        try{
            const ticketCreation = await create({
                title,
                description,
                status,
                priority
            }).unwrap

            console.log(ticketCreation);
            toast.success("Ticket Created Successfully...")

        }catch(e){
            console.log("Error in creating Ticket", e)
            toast.error(e?.data?.message || "Unable to create Ticket.. Try again ...")

        }

    }
    return (
        <div className='popup-ticket'>
        <div className='ticket-header'>
            <h3>Create New Ticket</h3>
            <i></i>
        </div>
        <form action={createTicket} className='form-popUp'>
            <div className='title-popup'>
                <label htmlFor="title">Title</label>
            <input type="text" id='title' name='text'/>
            </div> 
            <div className='descript-popup'>
                <label htmlFor="description">Description</label>
            <textarea name="description" id="description"></textarea>
            </div>          
            <div className='status'>
                <div>
                    <label htmlFor="status">Status</label>
                <select name="status" id="status">
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select>
                </div>
                <div>
                    <label htmlFor="priority">Priority</label>
                <select name="priority" id="priority">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                </div>
            </div>
            <div className='popup-buttons'>
                <button
                    type='button'
                    onClick={closePopUp}
                >Cancel</button>
            {isLoading ? <button className="loading"><Loader/></button>:<button type='submit'>Save Ticket</button>}
            </div>
        </form>
    </div>
    )
}
