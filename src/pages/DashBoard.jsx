import { Link } from "react-router-dom"
import { useState } from "react"
import { Header } from "../components/Header"
import ticketImage from "../assets/invoice.png"
import openFile from "../assets/open-folder.png"
import checkedImage from "../assets/comment.png"

export const DashBoard = () => {
  const [ popUp , setPopUp] =  useState(false)
  const [open, setOpen] = useState(false);
  
  const handleOpen = () =>{
          setOpen(prev => !prev)
      }

  const popUpScreen = ()=>{
      setPopUp(prev => !prev)
  }


  return (
    <main>
      <Header open={open} onToggle={handleOpen} onNewTicket={popUpScreen} />
      <section>
        <h1 className="dash">Dashboard</h1>
        <div className="cards">
          <div className="card">
              <div>
                <p>Total tickets</p>
                <img src={ticketImage} alt="ticket illustration" className="dashboardImage one" width={30} height={30}/>
              </div>
              <p>1284</p>
          </div>
          <div className="card">
                  <div >
                <p>Total tickets</p>
                <img src={openFile} alt="Opened" width={30} height={30} className="dashboardImage two"/>
              </div>
              <p>1284</p>
          </div>
          <div className="card">
                  <div>
                <p>Total tickets</p>
                <img src={checkedImage} alt="checked" width={30} height={30} className="dashboardImage three" />
              </div>
              <p>1284</p>
          </div>
        </div>
      </section>
      <section>
        <h2>Recent Tickets</h2>
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
      </section>
    </main>
  )
}
