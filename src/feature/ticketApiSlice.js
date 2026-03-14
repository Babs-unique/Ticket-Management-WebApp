import {api} from '../api/api.js';


export const ticketApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query({
            url : '/api/getAllTickets',
            providesTags : ['Tickets']
        }),
        createTicket: builder.mutation({
            query: (ticketData) => ({
                url : '/api/createTicket',
                method : 'POST',
                body : ticketData
            }),
            invalidatesTags: ['Tickets']
        }),
        updateTicket: builder.mutation({
            query: (ticketData) => ({
                url: `/api/update/${ticketData.id}`,
                method: 'PUT',
                body: ticketData
            }),
            invalidatesTags: ['Tickets']
        }),
        deleteTicket: builder.mutation({
            query: (id) => ({
                url: `/api/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tickets']
        }),
        filterByStatus: builder.query({
            query: (status) => ({
                url: `/api/filterByStatus?status=${status}`,
            }),
            providesTags: ['Tickets']
        }),
        searchTickets: builder.query({
            query: (query) => ({
                url: `/api/search?query=${query}`,
                method: 'GET',
            }),
            providesTags: ['Tickets']
        })
    })

});

export const { useGetTicketsQuery, useCreateTicketMutation, useUpdateTicketMutation, useDeleteTicketMutation, useFilterByStatusQuery, useSearchTicketsQuery } = ticketApiSlice;