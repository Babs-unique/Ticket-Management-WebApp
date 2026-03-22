import React, { useState, useEffect } from 'react'
import { PopUp } from '../components/PopUp'
import { Navbar } from '../components/Navbar'
import addTicketIcon from "../assets/plus.png"
import editIcon from "../assets/pencil.png"
import deleteIcon from "../assets/trash.png"
import { useGetTicketsQuery } from "../feature/ticketApiSlice"


export const Ticket = () => {
    const [open, setOpen] = useState(false);
    const [showPopUp , setShowPopUp] = useState(false)
    const { data , isLoading , isError } = useGetTicketsQuery()

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
                <p>All</p>
                <p>Open</p>
                <p>Progress</p>
                <p>Closed</p>
            </div>
            </div>
            <div className='ticket-show'>
                <div className='tickets'>
                <div>
                    <h2>API integration of System</h2>
                    <p>Need to connect API to my project for the completion of the project</p>
                </div>
                <div className='tickets-actions'>
                    <img src={editIcon} alt="Edit Tickets" width={20} height={20} />
                    <img src={deleteIcon} alt="" width={20} height={20} />
                </div>
                </div>
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
