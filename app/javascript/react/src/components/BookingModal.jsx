import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ServerError from './ServerError'


const BookingModal = ({avail, closeModal, showModal}) => {
    const { studentId, coachId } = useParams()
    const [hasServerErrors, setHasServerErrors] = useState(false)
    const [serverErrors, setServerErrors] = useState([])

    const handleConfirm = () => {
        const dataObj = {
            date: avail.date + ' ' + avail.time,
            coach_id: coachId,
            student_id: studentId
        }
        createBooking(dataObj)
    }

    const createBooking = (data) => {
        fetch(`/api/v1/coaches/${coachId}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('success', data)
            if (data['status'] === "failure") {
                setHasServerErrors(true)
                setServerErrors(data['data'])
            } else {
                setHasServerErrors(false)
                setServerErrors([])
                closeModal()
            }
        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    return (
        <div id="bookingModal" aria-labelledby="exampleModalLabel" aria-hidden="true" className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={showModal ? {'display': 'block'} : ''}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Booking</h5>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    {hasServerErrors && <ServerError errors={serverErrors} />}
                    <div style={{'marginLeft' : '2em'}}>
                        Confirm for booking on {avail.date} at {avail.time}?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                        <button type="submit" className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingModal