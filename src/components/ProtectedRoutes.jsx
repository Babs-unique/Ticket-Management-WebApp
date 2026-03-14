import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import {useGetProfileQuery} from "../feature/authApiSlice"


const ProtectedRoutes = ({children}) => {
        const { data: profile, isLoading } = useGetProfileQuery();
        
        if(isLoading){
            return <div>Loading...</div>
        }
        else if(!profile){
            return <Navigate to="/login" replace />
        }
        if(!isLoading && !profile){
            return <Navigate to="/login" replace />
        }
        return children;
    }
    
export default ProtectedRoutes;
