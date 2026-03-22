import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import {useGetProfileQuery} from "../feature/authApiSlice"
import Loader from "../components/loader-two"


const ProtectedRoutes = ({children}) => {
        const { data , isLoading , error} = useGetProfileQuery();
        
        if(isLoading){
            return <Loader/>
        }
        if(error){
            return <Navigate to="/login" replace/>
        }
        return children;
    }
    
export default ProtectedRoutes;
