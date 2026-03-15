/**
 * Fake Sign Up Service - for development/testing purposes
 * This module contains the legacy local storage based sign up logic
 */

export const fakeSignUp = {
    performSignUp: (email, password, confirmPassword, setError, setSuccess, setRedirect, navigate, replace) => {
        // Validate password
        if(password.length < 6 || !password.match(/[A-Z]/) || !password.match(/[0-9]/)){
            setError("Enter a valid password ");
            return;
        }

        // Validate password match
        if(password !== confirmPassword){
            setError("Password doesn't match");
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem("user")) || [];
        const userFound = users.some((user) => user.email === email && user.password === password)
        
        if(userFound) {
            setSuccess("User already Exists")
            setRedirect("Kindly Login to your account...")
        } else {
            setSuccess("Account Created Successfully!")
            setRedirect("Redirecting you to the Login Page...")
            users.push({email, password});
            localStorage.setItem("user", JSON.stringify(users))
            setTimeout(() => {
                navigate("/login", replace)
            }, 2000)
        }
        
        setError("")
    }
}
