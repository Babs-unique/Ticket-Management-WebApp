import {api} from '../api/api.js';


export const ticketApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query({
            url : '/api/tickets/getAllTickets',
            providesTags : ['Tickets']
        }),
        createTicket: builder.mutation({
            query: (ticketData) => ({
                url : '/api/tickets/createTicket',
                method : 'POST',
                body : ticketData
            }),
            invalidatesTags: ['Tickets']
        }),
        updateTicket: builder.mutation({
            query: (ticketData) => ({
                url: `/api/tickets/update/${ticketData.id}`,
                method: 'PUT',
                body: ticketData
            }),
            invalidatesTags: ['Tickets']
        }),
        deleteTicket: builder.mutation({
            query: (id) => ({
                url: `/api/tickets/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tickets']
        }),
        filterByStatus: builder.query({
            query: (status) => ({
                url: `/api/tickets/filterByStatus?status=${status}`,
            }),
            providesTags: ['Tickets']
        }),
        searchTickets: builder.query({
            query: (query) => ({
                url: `/api/tickets/search?query=${query}`,
                method: 'GET',
            }),
            providesTags: ['Tickets']
        })
    })

});

export const { useGetTicketsQuery, useCreateTicketMutation, useUpdateTicketMutation, useDeleteTicketMutation, useFilterByStatusQuery, useSearchTicketsQuery } = ticketApiSlice;