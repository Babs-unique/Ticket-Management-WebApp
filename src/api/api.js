import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../feature/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.API_BASE_URL,
    credentials: 'include',
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery({
            url : '/api/users/refresh',
            method: 'POST',
        }, 
            api, extraOptions);
        if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout()); 
        }
        }
    }

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Ticket'],
    endpoints: () => ({})
})

