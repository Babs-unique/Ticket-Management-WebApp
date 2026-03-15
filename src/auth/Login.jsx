import React from 'react'
import { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import eye from "../assets/eye.svg"
import eyeOff from "../assets/eye-off.svg"
import { togglePassword } from '../hooks/togglePassword';
export const Login = () => {
    const[error , setError] = useState("");
    const [success , setSuccess] = useState("")
    const [redirect , setRedirect] = useState("")

    const navigate = useNavigate();
    function handleLogin(formData){
        const users = JSON.parse(localStorage.getItem("user")) || []


        const email = formData.get("email");
        const password = formData.get("password");
        if(password.length < 6 || !password.match(/[A-Z]/) || !password.match(/[0-9]/)){
            setError("Enter a valid password ");
            return;
        }
        if(!email.includes("@") || !email.includes(".")){
            setError("Enter a valid Email Address")
        }
        const userExist = users.find(user => user.email === email && user.password === password)
        if(!userExist || userExist === undefined){
                setSuccess("Create an account")
            setRedirect("Go to the SignUp Page")
            
        }else{
            setSuccess("Login Successful!")
            setRedirect("Redirecting you to the Dashboard...")
                setTimeout(()=>{
            navigate("/Dashboard",replace(-1))
        },3000)
        }
        setError("")
    
    }
        const {toggle , handleToggle} = togglePassword();
    return (
        <main className='login'>
        <form className='login-form' action={handleLogin}>
            <h2>Login to TicketFlow</h2>
            <label htmlFor="email">Email</label>
            <div>
            <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='you@example.com' 
            required/>
            </div>
            <label htmlFor="password">Password</label>
            <div className='password-input'>
            <input 
                type={toggle ? "password" : "text"} 
                name="password" 
                id="password" 
                placeholder='Enter your password'
                required/>
                <img 
                src={toggle ? eye : eyeOff} 
                alt="toggle-password-visibility" 
                srcset="" 
                className='eye'
                onClick={handleToggle}
                />
                </div>
            <p>{error}</p>
            <button>Login</button>
            <div>
            <p>Don't have an account?<Link to="/SignUp"> Sign up</Link></p>
            </div>
        </form>
            { success && <div className='successMsg'>
                <h3>{success}</h3>
                <p>{redirect}</p>
            </div>}
        </main>
    )
}
