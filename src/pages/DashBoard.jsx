import { Link } from "react-router-dom"
import { useState } from "react"
import { Header } from "../components/Header"
import ticketImage from "../assets/invoice.png"
import openFile from "../assets/open-folder.png"
import checkedImage from "../assets/comment.png"
import clsx from "clsx"
import { useTimeAgo } from "../hooks/useTimeago"
import { useGetProfileQuery } from "../feature/authApiSlice"
import { useGetTicketsQuery } from "../feature/ticketApiSlice"

export const DashBoard = () => {
  const { data: profile } = useGetProfileQuery()
  const { data , isLoading , isError } = useGetTicketsQuery()
  const [ popUp , setPopUp] =  useState(false)
  const [open, setOpen] = useState(false);


  
  const handleOpen = () =>{
          setOpen(prev => !prev)
      }

  const popUpScreen = ()=>{
      setPopUp(prev => !prev)
  }
  const timeAgo = useTimeAgo(data?.tickets.updatedAt)
  return (
    <main>
      <div className='glow-circle'></div>
      <Header open={open} onToggle={handleOpen} onNewTicket={popUpScreen} />
      <section>
        <h1 className="dash-1">Dashboard</h1>
        <div className="cards">
          <div className="card">
              <div>
                <p>Total tickets</p>
                <img src={ticketImage} alt="ticket illustration" className="dashboardImage one" width={30} height={30}/>
              </div>
              <p>{data?.total}</p>
          </div>
          <div className="card">
                  <div >
                <p>Open tickets</p>
                <img src={openFile} alt="Opened" width={30} height={30} className="dashboardImage two"/>
              </div>
              <p>{data?.openTickets}</p>
          </div>
          <div className="card">
                  <div>
                <p>Resolved tickets</p>
                <img src={checkedImage} alt="checked" width={30} height={30} className="dashboardImage three" />
              </div>
              <p>{data?.closedTickets}</p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="dash">Recent Tickets</h2>
        <div className="ticket-metrics">
          <div>
            <p>TICKET ID</p>
            <p>SUBJECT</p>
          </div>
          <div>
            <p>STATUS</p>
            <p className="updated">LAST  UPDATED</p>
          </div>
        </div>
        <div className="ticket-list">
          {
            isLoading ? <p>Loading...</p> : isError ? <p>Error </p> : data.tickets.map((ticket) => (
              <div className=" tickets-list" key={ticket._id}>
                  <div>
                    <p>{ticket.ticketId}</p>
                    <p>{ticket.title}</p>
                  </div>
                  <div>
                    <p className={
                      clsx({
                        open: ticket.status === "open",
                        progress: ticket.status === "progress",
                        closed: ticket.status === "closed",
                      })
                    }>{ticket.status}</p>
                    <p className="updated">{timeAgo}</p>
                  </div>
                </div>
            ))
          }
        </div>
      </section>
    </main>
  )
}
