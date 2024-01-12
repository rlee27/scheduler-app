import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import TimeTable from './TimeTable'
import NewAvailability from './NewAvailability'

const CoachView = () => {
    const { id } = useParams()
    const [coach, setCoach] = useState(null)

    const fetchCoachData = () => {
        fetch(`/api/v1/coaches/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setCoach(data)
            console.log(data)
        })
    }

    useEffect(() => {
        fetchCoachData()
    }, [id])

    if (!coach) {
        return <div>Loading...</div>
    }

    return(
        <div>
            <div className="d-flex justify-content-between p-3">
                <h1>Hello {coach.name}</h1>
                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#availabilityModal">Add Availability</button>
                <Link to={`reviews`} className="btn btn-outline-secondary d-flex align-items-center">Reviews</Link>
            </div>
            <div className="mt-2">
                <TimeTable />
            </div>
            <NewAvailability />
        </div>
    )
}

export default CoachView