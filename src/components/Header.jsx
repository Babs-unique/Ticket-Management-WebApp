import React from 'react'
import { Link } from 'react-router-dom'
import profileImage from "../assets/user.png"

export const Header = ({ open, onToggle, onNewTicket }) => {
    return (
        <header className='header'>
            <nav>
                <h2>TicketFlow</h2>
                <ul className={open ? 'open-nav' : 'settings-aside'}>
                    <Link to='/DashBoard' className="dashboard-link">Dashboard</Link>
                    <Link to='/Ticket' className="dashboard-link">Ticket</Link>
                    <Link to='/Settings' className="dashboard-link">Setting</Link>
                </ul>
                <div className="configuration">
                    <Link 
                        to='/Ticket' 
                        className="new-ticket"
                        onClick={onNewTicket}
                    >
                        New Ticket
                    </Link>
                    <Link to="/Settings">
                        <img src={profileImage} alt="" width={30} height={30} />
                    </Link>
                </div>
                <div className="hamburger" onClick={onToggle}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </nav>
        </header>
    )
}
