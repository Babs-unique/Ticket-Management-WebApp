import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import {useGetProfileQuery} from "../feature/authApiSlice"


const ProtectedRoutes = ({children}) => {
        const { data , isLoading , error} = useGetProfileQuery();
        
        if(isLoading){
            return <div>Loading...</div>
        }
        if(error){
            return <Navigate to="/login" replace/>
        }
        return children;
    }
    
export default ProtectedRoutes;
