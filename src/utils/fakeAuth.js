/**
 * Fake Authentication Service - for development/testing purposes
 * This module contains the legacy local storage based authentication logic
 */

export const fakeAuth = {
    performLogin: (email, password, setError, setSuccess, setRedirect, navigate, replace) => {
        const users = JSON.parse(localStorage.getItem("user")) || []

        // Validate password
        if(password.length < 6 || !password.match(/[A-Z]/) || !password.match(/[0-9]/)){
            setError("Enter a valid password ");
            return;
        }

        // Validate email
        if(!email.includes("@") || !email.includes(".")){
            setError("Enter a valid Email Address")
            return;
        }

        // Check if user exists
        const userExist = users.find(user => user.email === email && user.password === password)
        
        if(!userExist || userExist === undefined){
            setSuccess("Create an account")
            setRedirect("Go to the SignUp Page")
        }else{
            setSuccess("Login Successful!")
            setRedirect("Redirecting you to the Dashboard...")
            setTimeout(()=>{
                navigate("/Dashboard", replace(-1))
            }, 3000)
        }
        setError("")
    }
}
