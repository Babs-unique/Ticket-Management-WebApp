import React from 'react'
import { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    return (
        <main className='login'>
        <form className='login-form' action={handleLogin}>
            <h2>Login to TicketFlow</h2>
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='you@example.com' 
            required/>
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder='Enter your password'
                required/>
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
