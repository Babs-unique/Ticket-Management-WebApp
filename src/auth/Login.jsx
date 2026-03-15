import React from 'react'
import { useState } from 'react';
/* import { replace, useNavigate } from 'react-router-dom'; */
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import eye from "../assets/eye.svg"
import eyeOff from "../assets/eye-off.svg"
import { togglePassword } from '../hooks/togglePassword';
import { useLoginMutation } from '../feature/authApiSlice'
import { setCredentials } from '../feature/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");


    const dispatch = useDispatch(); 
    const navigate = useNavigate();

        const [login, {isLoading}] = useLoginMutation();
        const {toggle , handleToggle} = togglePassword();

        const handleLogin = async (e) => {
            e.preventDefault();
            try{
                const userData = await login({email, password}).unwrap();
                console.log("Login successful:", userData);
                if(userData){
                    setEmail("");
                    setPassword("");
                }
                dispatch(setCredentials(userData.user));
                toast.success("Login successful! Redirecting to dashboard...");
                setTimeout(() => {
                    navigate("/Dashboard", { replace: true });
                }, 2000);
            }
            catch(err){
                    console.error("Login failed:", err);
                    const errorMessage = err?.data?.message || "Login failed. Please try again.";
                    toast.error(errorMessage)
            }
        }
    return (
        <main className='login'>
        <form className='login-form' onSubmit={handleLogin}>
            <h2>Login to TicketFlow</h2>
            <label htmlFor="email">Email</label>
            <div>
            <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='you@example.com' 
            onChange={(e) => setEmail(e.target.value)}
            required/>
            </div>
            <label htmlFor="password">Password</label>
            <div className='password-input'>
            <input 
                type={toggle ? "password" : "text"} 
                name="password" 
                id="password" 
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)}
                required/>
                <img 
                src={toggle ? eye : eyeOff} 
                alt="toggle-password-visibility" 
                srcset="" 
                className='eye'
                onClick={handleToggle}
                />
                </div>
            <button disabled={isLoading}>Login</button>
            <div>
            <p>Don't have an account?<Link to="/SignUp"> Sign up</Link></p>
            </div>
        </form>
        </main>
    )
}
