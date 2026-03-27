import React, { useState, useEffect } from 'react'
import { PopUp } from '../components/PopUp'
import { Navbar } from '../components/Navbar'
import addTicketIcon from "../assets/plus.png"
import editIcon from "../assets/pencil.png"
import deleteIcon from "../assets/trash.png"
import Loader from '../components/loader-two'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDebounce } from 'use-debounce'
import { useFilterQuery , useUpdateTicketMutation , useDeleteTicketMutation } from '../feature/ticketApiSlice'


export const Ticket = () => {
    const [open, setOpen] = useState(false);
    const [showPopUp , setShowPopUp] = useState(false)
    const [modalAction , setModalAction] = useState("create")
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [itemsPerPage , setItemsPerPage] = useState(10);  

    const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

    const { data, isLoading, isError } = useFilterQuery({ status: statusFilter, q: debouncedSearchQuery , page, limit: itemsPerPage });
    const [updateTicket] = useUpdateTicketMutation();
    const [deleteTicket] = useDeleteTicketMutation();

    console.log("Data in ticket page", data)

    useEffect(() => {
        setPage(1); 
    }, [statusFilter, debouncedSearchQuery]);

    const handleOpen = () =>{
        setOpen(prev => !prev)
    }

    const handleNewTicket = () => {
        setShowPopUp(true)
    }
    const handleAddTicket = () => {
        setShowPopUp(true);
        setModalAction("create");
        setSelectedTicket(null);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
return (
    <main className='ticket'>
        <Navbar open={open} onToggle={handleOpen} onNewTicket={handleNewTicket} />
        <section>
            <div className='all-ticket'>
                <h1 className='all-tickets'>All Tickets</h1>
                <div className="hamburger" onClick={handleOpen}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='ticket-search'>
            <input type="text" 
            name="" id="" 
            placeholder='Search tickets by title or description'
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
                <p onClick={() => setStatusFilter('all')}>All</p>
                <p onClick={() => setStatusFilter('open')}>Open</p>
                <p onClick={() => setStatusFilter('progress')}>Progress</p>
                <p onClick={() => setStatusFilter('closed')}>Closed</p>
            </div>
            </div>
            <div className='ticket-show'>
                {isLoading ? <Loader /> : isError ?( <p>Error fetching tickets</p> ) :  data?.tickets?.length > 0 ? ( data?.tickets?.map((ticket) => (
                    <div className='tickets' key={ticket._id}>
                    <div>
                        <h2>{ticket?.title}</h2>
                        <p>{ticket?.description}</p>
                    </div>
                    <div className='tickets-actions'>
                        <img src={editIcon} 
                        alt="Edit Tickets" 
                        width={20} height={20}
                        onClick={
                            () => {
                                setSelectedTicket(ticket)
                                setShowPopUp(true)
                                setModalAction("edit")
                            }
                        }
                        

                        />
                        <img src={deleteIcon}
                        alt=""
                        width={20} height={20}
                        />
                    </div>
                </div>
                ))) : <p>{data?.message || "No tickets found"}</p>}
            </div>
            <div className="pagination">
{/*                 <button
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                >
                    Prev
                </button>

                <span>
                    Page {data?.currentPage || 1} of {data?.totalPages || 1}
                </span>

                <button
                    disabled={page === data?.totalPages}
                    onClick={() => setPage(prev => prev + 1)}
                >
                    Next
                </button> */}
                <Stack spacing={2}>
                    <Pagination
                        count={data?.totalPages || 1}
                        page={data?.currentPage || page}
                        onChange={(event, value) => setPage(value)}
                        color="primary"
                        variant="outlined"
                        className = "pagination"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: '#00FF88',
                                borderColor: '#00FF88',
                            },
                            '& .Mui-selected': {
                                backgroundColor: '#00FF88',
                                color: '#000',
                            }}}/>
                </Stack>
            </div>
        </section>
        <img src={addTicketIcon} alt="Add ticket"  width={30} height={30} className='add-ticket'
        onClick={() => setShowPopUp(true)}
        />
        {showPopUp &&   <PopUp 
        addTicket={handleAddTicket}
        modalAction={modalAction}
        selectedTicket={selectedTicket}
        closePopUp={() => {
        setSelectedTicket(null);
        setShowPopUp(false);
        setModalAction("create");
    }}
        /> }
    </main>
)
}
