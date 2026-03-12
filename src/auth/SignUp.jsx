import React from 'react'
import { useState } from 'react';
import { Link, replace, useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("")
    const [redirect , setRedirect] = useState("")
    const navigate = useNavigate();
    function handleSignUp (formData){
      /*   e.preventDefault(); */
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userFound = users.some((user)=> user.email === email && user.password === password)
        if(!userFound) {
            setSuccess("User already Exists")
            setRedirect("Kindly Login to your account...")
        }else{
            setSuccess("Account Created Successfully!")
            setRedirect("Redirecting you to the Login Page...")
            navigate("/login", replace)
        }
        console.log(userFound)
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm")
        if(password.length < 6 || !password.match(/[A-Z]/) || !password.match(/[0-9]/)){
            setError("Enter a valid password ");
            return;
        }
        if(password !== confirmPassword){
            setError("Password doesn't match");
            return;
        }

        setError("")
        users.push({email,password});
        localStorage.setItem("user",JSON.stringify(users))
    }


    return (
        <main className='signUp'>
            <form className='signup-form' action={handleSignUp}>
                <h2>Create an Account</h2>
                <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    name="email" 
                    id="email" 
                    placeholder='you@example.com'/>
                </div>
                <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password" 
                    name="password"
                    id="password" 
                    placeholder='Enter a secure password' />
                <p>{error}</p>
                </div>
                <div>
                <label htmlFor="confirm">Confirm Password</label>
                <input 
                type="password" 
                name="confirm" 
                id="confirm" 
                placeholder='Re-enter your password' 
                required/>
                <p>{error}</p>
                </div>
                <button>Sign Up</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
            { success &&  <div className='successMsg'>
                <h3>{success} </h3>
                <p>{redirect}</p>
            </div>}
        </main>
    )
}
