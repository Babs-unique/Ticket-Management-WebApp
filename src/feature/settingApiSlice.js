import {api} from '../api/api.js';

export const settingApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (profileData) => ({
                url : '/api/settings/update/profileDetails',
                method : 'PUT',
                body : profileData
            }),
            invalidatesTags: ['User']
        }),
        changePassword: builder.mutation({
            query: (passwordData) => ({
                url : '/api/settings/update/password',
                method : 'PUT',
                body : passwordData
            }),
            invalidatesTags: ['User']
        }),
         profilePictureUpload: builder.mutation({
            query: (formData) => ({
                url : '/api/settings/update/profileImg',
                method : 'PUT',
                body : formData
            }),
            invalidatesTags: ['User']
         })
    })
})

export const { useUpdateProfileMutation, useChangePasswordMutation, useProfilePictureUploadMutation } = settingApiSlice;