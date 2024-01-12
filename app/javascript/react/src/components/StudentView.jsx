import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BookingModal from './BookingModal'

const StudentView = () => {
    const { studentId, coachId } = useParams()
    const [availability, setAvailability] = useState([])
    const [coach, setCoach] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [selectedAvail, setSelectedAvail] = useState(null)

    const fetchCoachData = () => {
        fetch(`/api/v1/coaches/${coachId}`)
        .then((response) => response.json())
        .then((data) => {
            setCoach(data)
            console.log(data)
        })
    }

    const fetchCoachAvailabilityData = () => {
        fetch(`/api/v1/coaches/${coachId}/availabilities`)
        .then((response) => response.json())
        .then((data) => {
            setAvailability(data)
            console.log(data)
        })
    }

    useEffect(() => {
        fetchCoachData()
        fetchCoachAvailabilityData()
    }, [coachId])
    
    if (!coach) {
        return <div>Loading...</div>
    }

    const handleSelectedAvail = (avail) => {
        setSelectedAvail(avail)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedAvail(null)
    }

    return(
        <div>
            <h3>Here is {coach.name}'s availability</h3>
            <div className="d-flex">
                {availability.map(avail => (
                    <div key={avail.id} className="card m-2" style={{'width':'18em'}}>
                        <div className="card-body">
                            <h5 className="card-title">{avail.date}</h5>
                            <h6 className="card-sutitle mb-2 text-muted">{avail.time}</h6>
                            <p className="card-text"></p>
                            <button className="btn btn-primary" onClick={() => handleSelectedAvail(avail)}>Book</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedAvail && (
                <BookingModal avail={selectedAvail} closeModal={closeModal} showModal={showModal} />
            )}
        </div>
    )
}


export default StudentView