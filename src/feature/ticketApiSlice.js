import {api} from '../api/api.js';


export const ticketApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query({
            query: () => ({
            url : '/api/tickets/getAllTickets',
            providesTags : ['Tickets'],
            method : 'GET'
            })
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
                method : 'GET',
            }),
            providesTags: ['Tickets']
        }),
        searchTickets: builder.query({
            query: (query) => ({
                url: `/api/tickets/search?q=${query}`,
                method: 'GET',
            }),
            providesTags: ['Tickets']
        }),
        filter: builder.query({
            query: ({ status, q, page, limit }) => {
        const params = new URLSearchParams();

        if (status && status !== 'all') params.append('status', status);
        if (q) params.append('q', q);
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);

        return {
        url: `/api/tickets/filter?${params.toString()}`,
        method: 'GET',
        };
    },
            providesTags: ['Tickets'],
        })
    })

});

export const { useGetTicketsQuery, useCreateTicketMutation, useUpdateTicketMutation, useDeleteTicketMutation, useFilterByStatusQuery, useSearchTicketsQuery , useFilterQuery } = ticketApiSlice;