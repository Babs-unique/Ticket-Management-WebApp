import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { togglePassword } from '../hooks/togglePassword';
import eye from "../assets/eye.svg"
import eyeOff from "../assets/eye-off.svg"
import { useRegisterMutation } from '../feature/authApiSlice';

export const SignUp = () => {
    const [name , setName] = useState("")
    const [ email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [register, {isLoading}] = useRegisterMutation();
    const {toggle , handleToggle} = togglePassword()

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
            if(!password){
                toast.error("Enter your password");
                return;
            }
            const userData = await register({name , email, password}).unwrap();
            console.log("Registration successful:", userData);
            if(userData){
                setName("");
                setEmail("");
                setPassword("");
            }
            toast.success("Registration successful! Redirecting to login page...");
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 2000);
        }
        catch(err){
            console.error("Registration failed:", err);
            const message = err?.data?.message || "Registration failed. Please try again.";
            toast.error(message);
        }
    }
    return (
        <main className='signUp'>
            <form className='signup-form' onSubmit={handleSignUp}>
                <h2>Create an Account</h2>
                <div>
                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    name="name" 
                    id="name" 
                    placeholder='john doe'
                    onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className='password-input'>
                <label htmlFor="email">Email</label>
                <input
                    type="email" 
                    name="email"
                    id="email" 
                    placeholder='Enter your Email Address'
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='password-input'>
                <label htmlFor="password">Password</label>
                <input 
                type={toggle ? "password" : "text"} 
                name="password" 
                id="password" 
                placeholder=' Enter your Password' 
                onChange={(e) => setPassword(e.target.value)}
                required/>
                <img 
                    src={toggle ? eye : eyeOff} 
                    alt="toggle-password-visibility" 
                    srcset="" 
                    className='eye eye-2'
                    onClick={handleToggle}
                    />
                </div>
                <button disabled={isLoading}>Sign Up</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </main>
    )
}
