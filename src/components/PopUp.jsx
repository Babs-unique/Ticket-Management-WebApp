import React, { useState } from 'react'

export const PopUp = ({closePopUp}) => {
    return (
        <div className='popup-ticket'>
        <div className='ticket-header'>
            <h3>Create New Ticket</h3>
            <i></i>
        </div>
        <form action="" className='form-popUp'>
            <div className='title-popup'>
                <label htmlFor="title">Title</label>
            <input type="text" id='title' name='text'/>
            </div> 
            <div className='descript-popup'>
                <label htmlFor="description">Description</label>
            <textarea name="description" id="description"></textarea>
            </div>          
            <div className='status'>
                <div>
                    <label htmlFor="">Status</label>
                <select name="" id="">
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select>
                </div>
                <div>
                    <label htmlFor="">Priority</label>
                <select name="" id="">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                </div>
            </div>
            <div className='popup-buttons'>
                <button
                    type='button'
                    onClick={closePopUp}
                >Cancel</button>
                <button type='submit'
                 /*    onClick={(e) => {
                        e.preventDefault();
                    }}  */
                >Save Ticket</button>
            </div>
        </form>
    </div>
    )
}
