import { api } from '../api/api.js';

export const authApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url : '/api/users/login',
                method : 'POST',
                body : credentials
            })
        }),
        register: builder.mutation({
            query: (userData) => ({
                url : '/api/users/register',
                method : 'POST',
                body : userData
            })
        }),
        logout: builder.mutation({
        query: () => ({
            url : '/api/users/logout',
            method : 'POST',
        })
        }),
        getProfile: builder.query({
            query: () => ({
                url : '/api/users/me',
                method: 'GET'
            }),
            providesTags : ['User']
        })
    })
})



export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetProfileQuery } = authApiSlice;