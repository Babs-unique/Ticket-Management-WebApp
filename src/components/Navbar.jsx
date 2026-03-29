import React from 'react'
import { Link } from 'react-router-dom'
import { setCredentials } from '../feature/authSlice'
import { useDispatch } from 'react-redux';
import dashboardImage from "../assets/dashboard.png"
import ticketImage from '../assets/ticket.png'
import settingImage from "../assets/setting.png"
import LogoutImage from '../assets/logout.png'

export const Navbar = ({ open, onToggle, onNewTicket }) => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(setCredentials(null))
    }
    return (
        <aside className={open ? 'open-nav' : 'settings-aside'}>
            <div className='settings-top'>
                <h3>TicketFlow</h3>
                <div className='links-sections'>
                    <Link to='/Dashboard' className='ticket-links'>
                        <div>
                            <img src={dashboardImage} alt="dashboard" width={20} height={20} />
                            <p>Dashboard</p>
                        </div>
                    </Link>
                    <Link to='/Ticket' className='ticket-links'>
                        <div>
                            <img src={ticketImage} alt="Tickets" width={20} height={20} />
                            <p>Tickets</p>
                        </div>
                    </Link>
                    <Link to='/Settings' className='ticket-links'>
                        <div>
                            <img src={settingImage} alt="Settings" width={20} height={20} />
                            <p>Settings</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='logout'>
                <button onClick={onNewTicket} className='ticket-button'>
                    New ticket
                </button>
                <div className='profile settings-profile'>
                    <div className='profile-card'>
                        <span>BA</span>
                    </div>
                    <div className='profile-name'>
                        <span>Babatunde</span>
                        <span>Sass Project</span>
                    </div>
                </div>
                <Link to='/' className='Logout' onClick={handleLogout}>
                    <div>
                        <img src={LogoutImage} alt="Logout" width={30} height={30} className='logout-btn' />
                        <p>Logout</p>
                    </div>
                </Link>
            </div>
        </aside>
    )
}
