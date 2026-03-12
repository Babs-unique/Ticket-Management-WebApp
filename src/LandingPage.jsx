import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../src/assets/icons8-ticket-100.png'
import dashboardImage from "./assets/dashboard.png"
import fastImage from "./assets/thunder.png"
import collaborationImg from "./assets/team.png"

export const LandingPage = () => {
    return (
        <main>
            <div className='glow-circle'></div>
            <header>
                <nav>
                    <ul>
                        <div>
                        <img src={Logo} 
                        alt="App Logo"
                        width={40}
                        height={40}
                        loading='lazy' />
                        <li>TicketFlow</li>
                        </div>
                        <Link to= "/Login" className='button_link'>Login</Link>
                    </ul>
                </nav>
            </header>
            <section className='hero-section'>
                <h1>TicketFlow</h1>
                <p>Manage, Track, and Resolve Tickets Seamlessly.</p>
                <div>
                    <Link to= "/Login" className='button'>Login</Link>
                    <Link to="/SignUp" className='button'>Get started</Link>
                </div>
            </section>
            <section className='function'>
            <div className='function_div'>
                <h2>Everything You Need in One Place</h2>
                <p>Our platform is designed to streamline your workflow,enhance team productivity, and deliver exceptional  customer support with powerful,intuitive features.</p>
            </div>
            <div className='function__div'>
                <div>
                    <img src={fastImage} alt="Speed Creation" width={30} height={30} />
                    <h3>Fast Ticket Creation</h3>
                    <p>Instantly create and attach tickets with customizable fields and automated workflows</p>
                </div>
                <div>
                    <img src={dashboardImage} alt="Seamless Dashboard" width={30} height={30}/>
                    <h3>Smart Dashboard</h3>
                    <p>Visualize your support with an intuitive dashboard and tracks key performance indicators</p>
                </div>
                <div>
                    <img src={collaborationImg} alt="Team" width={30} height={30} />
                    <h3>Team Collaboration</h3>
                    <p>Work together in real-time with shared inboxes, internal notes, and seamless integration</p>
                </div>
            </div>
            </section>
            <footer>
                <ul>
                    <li>Terms of Service </li>
                    <li>Privacy Policy</li>
                    <li>Contact</li>
                </ul>
                <p>&copy; 2025 TicketFlow. All right reserved.</p>
            </footer>
        </main>
        
    )
}
