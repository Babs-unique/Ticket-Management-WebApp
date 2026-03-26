import React, { useState, useEffect } from 'react'
import { PopUp } from '../components/PopUp'
import { Navbar } from '../components/Navbar'
import addTicketIcon from "../assets/plus.png"
import editIcon from "../assets/pencil.png"
import deleteIcon from "../assets/trash.png"
import { useGetTicketsQuery } from "../feature/ticketApiSlice"
import { useFilterByStatusQuery } from '../feature/ticketApiSlice'


export const Ticket = () => {
    const [open, setOpen] = useState(false);
    const [showPopUp , setShowPopUp] = useState(false)
    const [statusFilter, setStatusFilter] = useState('all');
    const { data , isLoading , isError } = useGetTicketsQuery()
    const { data, isLoading ,  isError} = useFilterByStatusQuery(statusFilter)

    console.log(data)

    const handleOpen = () =>{
        setOpen(prev => !prev)
    }

    const handleNewTicket = () => {
        setShowPopUp(true)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
return (
    <main className='ticket'>
        <Navbar open={open} onToggle={handleOpen} onNewTicket={handleNewTicket} />
        <section>
            <div className='all-ticket'>
                <h1 className='all-tickets'>All Tickets</h1>
                <div className="hamburger" onClick={handleOpen}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='ticket-search'>
            <input type="text" name="" id="" placeholder='Search tickets by title or description' />
            <div>
                <p onClick={() => setStatusFilter('all')}>All</p>
                <p onClick={() => setStatusFilter('open')}>Open</p>
                <p onClick={() => setStatusFilter('progress')}>Progress</p>
                <p onClick={() => setStatusFilter('closed')}>Closed</p>
            </div>
            </div>
            <div className='ticket-show'>
                {isLoading ? <>Loading...</> : isError ? <p>Error fetching tickets</p> : data.tickets.map((ticket) => (
                    <div className='tickets' key={ticket._id}>
                    <div>
                        <h2>{ticket?.title}</h2>
                        <p>{ticket?.description}</p>
                    </div>
                    <div className='tickets-actions'>
                        <img src={editIcon} alt="Edit Tickets" width={20} height={20} />
                        <img src={deleteIcon} alt="" width={20} height={20} />
                    </div>
                </div>
                ))}
            </div>
        </section>
        <img src={addTicketIcon} alt="Add ticket"  width={30} height={30} className='add-ticket'
        onClick={() => setShowPopUp(true)}
        />
        {showPopUp &&   <PopUp
        closePopUp={() => setShowPopUp(false)}
        /> }
    </main>
)
}
