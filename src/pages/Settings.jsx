import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { toast } from 'react-toastify'
import { useUpdateProfileMutation , useChangePasswordMutation , useProfilePictureUploadMutation} from '../feature/settingApiSlice'
import Loader from '../components/loader'
import edit from "../assets/pencil.png"

export const SettingPage = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
    const [uploadProfilePicture, { isLoading: isUploadingPicture }] = useProfilePictureUploadMutation();
    
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

        const handleProfileUpdate = async (e) => {
            e.preventDefault();
            try {
                const updatedProfile = await updateProfile({ name, email }).unwrap();
                console.log("Profile updated successfully:", updatedProfile);
                toast.success("Profile updated successfully!");
            }catch(err){
                console.error("Error updating profile:", err);
                toast.error("Failed to update profile. Please try again.")
            }
        }

        const handlePasswordChange = async (e) => {
            e.preventDefault();
            try {
                const response = await changePassword(password).unwrap();
                console.log("Password changed successfully:", response);
                toast.success("Password changed successfully!");
            }catch(err){
                console.error("Error changing password:", err);
                const errorMessage = err?.data?.message || "Failed to change password. Please try again.";
                toast.error(errorMessage)
            }
        }

        const clearInputFields = () => {
            setName("");
            setEmail("");
            setPassword({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        }

        const uploadImage = () => {
            if (!profilePicture) {
                toast.error("Please select an image to upload.");
                return
            }
            const formData = new FormData();
            formData.append("profilePicture", profilePicture);
            uploadProfilePicture(formData)
        }

        const handleImageChange = (e) => {
            if(e.target.files && e.target.files[0]){
                setProfilePicture(e.target.files[0])
            }
        }



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
                            <div className='edit_picture'>
                                {profilePicture ? <img src={URL.createObjectURL(profilePicture)} alt="Profile avatar" className='image-upload' width={200} height={200}/> : <img src='' alt="Profile avatar" className='image-upload'/> }
                                <label htmlFor="upload">
                                <img src={edit} alt="" className="edit" width={30} height={30}/>
                                </label>
                            </div>
                            <input type="file" accept="image/*" className='upload' id='upload' onChange={handleImageChange} />
                            <div>
                                <button className='upload-image' 
                                onClick={uploadImage}
                                type='submit'
                                >
                                    Upload
                                </button    >
                        <button className='remove-image'>Remove</button>
                            </div>
                        </div>
                        
                        <div className='user-details'>
                            <div >
                                <label htmlFor="full-name">Full Name</label>
                            <input type="text"
                            id="full-name"
                            placeholder='Full-name'
                            value={name}
                            onChange={(e) => {
                                e.preventDefault();
                                setName(e.target.value);
                            }}
                            />
                            </div>
                            <div>
                                <label htmlFor="email">Email Address</label>
                            <input 
                            type="email"
                            id="email"
                            placeholder='johndoe@gmail.com'
                            value={email}
                            onChange={(e) => {
                                e.preventDefault()
                                setEmail(e.target.value);
                            }}/>
                            </div>
                        </div>
                        <div className='user-button'>
                            <button type='button' onClick={clearInputFields}>
                                Cancel
                            </button>
                            {isLoading ? <Loader/> : <button type='submit' onClick={handleProfileUpdate}>
                                Save Changes
                            </button>}
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
                            <input 
                            type="password" 
                            id='current-password'
                            value={password.currentPassword}
                            onChange={(e) => {
                                e.preventDefault();
                                setPassword(prev => ({
                                    ...prev,
                                    currentPassword: e.target.value
                                }));
                            }}
                            />
                            </div>
                            <div>
                                    <label htmlFor="new-password">New Password</label>
                            <input 
                            type="password" 
                            id='new-password'
                            value={password.newPassword}
                            onChange={(e) => {
                                e.preventDefault();
                                setPassword(prev => ({
                                    ...prev,
                                    newPassword: e.target.value
                                }));
                            }}
                            />
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirm New Password</label>
                            <input 
                            type="password" 
                            id='confirm-password'
                            value={password.confirmPassword}
                            onChange={(e) => {
                                e.preventDefault();
                                setPassword(prev => ({
                                    ...prev,
                                    confirmNewPassword: e.target.value
                                }));
                            }}
                            />
                            </div>
                        </div>
                        <div className='account-button'>
                            <button
                            type='button'
                            onClick={clearInputFields}
                            >Cancel</button>
                            {isChangingPassword ? <Loader/> : <button type='submit'
                            onClick={handlePasswordChange}
                            >Save Changes</button>}
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
