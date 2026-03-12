import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'


const ProtectedRoutes = ({children}) => {
        const authenticated = localStorage.getItem("user");
        
        if(!authenticated){
            return <Navigate to="/login" replace/>
        }
        return children;
    }
    
export default ProtectedRoutes;
