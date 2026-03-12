import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const SettingPage = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    const handleNewTicket = () => {
        // Handle new ticket creation
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
        <main className='settings'>
            <Navbar open={open} onToggle={handleOpen} onNewTicket={handleNewTicket} />
            <section className='setting-preference'>
                <div className='all-settings'>
                <div>
                    <h2>Settings</h2>
                    <p>Manage your profile,account and application preference</p>
                </div>
                <div className="hamburger" onClick={handleOpen}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                </div>
                <div className='user-profile'>
                    <h3>User Profile</h3>
                    <p>Update your photos and personal details</p>
                    <div className='image-settings'>
                        <div className='image-upload-settings'>
                            <img src="" alt="" className='image-upload'/>
                            <div>
                                <button className='upload-image'>Upload new picture</button>
                        <button className='remove-image'>Remove</button>
                            </div>
                        </div>
                        
                        <div className='user-details'>
                            <div >
                                    <label htmlFor="email">Full Name</label>
                            <input type="text" placeholder='Full-name' />
                            </div>
                            <div>
                                <label htmlFor="email">Email Address</label>
                            <input type="email" placeholder='johndoe@gmail.com' />
                            </div>
                        </div>
                        <div className='user-button'>
                            <button>Cancel</button>
                            <button>Save Changes</button>
                        </div>
                    </div>
                </div>
                <div className='account-settings'>
                    <h3>Account Settings</h3>
                    <p>Mange your password and security settings</p>
                    <div>
                        <h3>Change Password</h3>
                        <div className='account-password'>
                            <div>
                                <label htmlFor="current-password">Current Password</label>
                            <input type="password" id='current-password' />
                            </div>
                            <div>
                                    <label htmlFor="new-password">New Password</label>
                            <input type="password" id='new-password' />
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirm New Password</label>
                            <input type="password" id='confirm-password' />
                            </div>
                        </div>
                        <div className='account-button'>
                            <button>Cancel</button>
                            <button>Save Changes</button>
                        </div>
                    </div> 
                </div>
             {/*    FUTURE ADVANCEMENT */}
                {/* <div>
                    <h3>Notification Preferences</h3>
                    <p>Choose how you want to be notified.</p>
                    <div>
                        <div>
                            <div>
                                <h4>Email Alerts</h4>
                                <p>Get notified by email about tickets updates and mentions</p>
                            </div>
                            <div>
                                //toggle button
                                <button></button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h4>In-app Alerts</h4>
                                <p>Receive real-time notifications within the application</p>
                            </div>
                            <div>
                                <button></button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button>Cancel</button>
                        <button>Save Changes</button>
                    </div>
                </div>
                <div>
                    <h3>Application Preferences</h3>
                    <p>Customize the look and feel of the application</p>
                    <div>
                        <label htmlFor="theme">Theme</label>
                        <select name="theme" id="theme">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>

                        <label htmlFor=""></label>
                    </div>
                </div> */}
            </section>
        </main>
    )
}
