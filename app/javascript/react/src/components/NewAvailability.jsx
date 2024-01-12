import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ServerError from './ServerError'


const timetableRows = [
    { time: '8:00AM' },
    { time: '9:00AM' },
    { time: '10:00AM' },
    { time: '11:00AM' },
    { time: '12:00PM' },
    { time: '1:00PM' },
    { time: '2:00PM' },
    { time: '3:00PM' },
    { time: '4:00PM' },
    { time: '5:00PM' },
    { time: '6:00PM' },
    { time: '7:00PM' },
    { time: '8:00PM' }
]

const NewAvailability = () => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const { id } = useParams()
    const [hasServerErrors, setHasServerErrors] = useState(false)
    const [serverErrors, setServerErrors] = useState([])

    function convertTimeTo24HourFormat(timeString) {
        const [hours, minutes] = timeString.replace(/[^\d:]/g, '').split(':');
        let result = '';
      
        if (timeString.includes('AM')) {
          result = hours === '12' ? `00:${minutes}` : timeString.replace('AM', '');
        } else if (timeString.includes('PM')) {
          result = hours === '12' ? `${hours}:${minutes}` : `${parseInt(hours, 10) + 12}:${minutes}`;
        }
      
        return result;
    }

    const handleAvailabilitySubmit = (event) => {
        event.preventDefault()
        const datetimeStr = `${date} ${convertTimeTo24HourFormat(time)}`
        const obj = {date: datetimeStr, coach_id: id}
        createAvailability(obj)
    }

    const createAvailability = (data) => {
        fetch(`/api/v1/coaches/${id}/availabilities`, {
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
            }
        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    return(
        <div className="modal fade" id="availabilityModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Availability</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {hasServerErrors && <ServerError errors={serverErrors} />}
                    <form onSubmit={handleAvailabilitySubmit}>
                        <div className="modal-body d-flex justify-content-around" style={{height: '25vh'}}>
                            <div className="d-flex flex-column justify-content-around">
                                <label htmlFor="date">Date</label>
                                <label htmlFor="time">Time</label>
                            </div>
                            <div className="d-flex flex-column justify-content-around">
                                <input type="date" id="date" onChange={(e) => setDate(e.target.value)} />
                                <select type="select" id="time" onChange={(e) => setTime(e.target.value)}>
                                    {timetableRows.map(d => (
                                        <option key={d.time} value={d.time}>{d.time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewAvailability