import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ServerError from './ServerError'

const NewReview = (props) => {
    const ratingVals = [5, 4, 3, 2, 1]

    const { needsReviews } = props
    const { id } = useParams()
    const [hasServerErrors, setHasServerErrors] = useState(false)
    const [serverErrors, setServerErrors] = useState([])
    const [formField, setFormField] = useState({
        booking_id: null,
        rating: '',
        feedback: '',
    })

    const formatDateTime = (input) => {
        const options = { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC'}
        const formatted = new Date(input).toLocaleString('en-US', options)

        return formatted
    }

    const handleReviewSubmit = (event) => {
        event.preventDefault()
        console.log(formField)

        createReview(formField)
    }

    const handleFormFields = (event) => {
        setFormField({ ...formField, [event.target.name]: event.target.value})
    }

    const createReview = (data) => {
        fetch(`/api/v1/reviews`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:",data)
            if (data['status'] === "failure") {
                setHasServerErrors(true)
                setServerErrors(data['data'])
            } else {
                setHasServerErrors(false)
                setServerErrors([])
            }
        })
        .catch((error) => {
            console.log("Error:",error)
        })
    }

    return (
        <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="addReviewModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addReviewModal">Add Review</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {hasServerErrors && <ServerError errors={serverErrors} />}
                    <form onSubmit={handleReviewSubmit}>
                        <div className="modal-body container" style={{}}>
                            <div className="row m-2">
                                <label htmlFor="booking_id" className="col-sm">Select Previous Booking</label>
                                <select name="booking_id" id="booking_id" className="col-sm" onChange={handleFormFields}>
                                    <option value="" defaultValue>Booking</option>
                                    {needsReviews.map((review) => (
                                        <option value={review.id}>{formatDateTime(review.date)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="row m-2">
                                <label htmlFor="rating" className="col-sm">Select Rating</label>
                                <select name="rating" id="rating" className="col-sm" onChange={handleFormFields}>
                                    <option value="" defaultValue>Rating</option>
                                    {ratingVals.map((val) => (
                                        <option value={parseInt(val)}>{val}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="row m-2">
                                <label htmlFor="feedback" className="col-sm">Enter Feedback</label>
                                <textarea name="feedback" id="feedback" rows="10" cols="8" className="col-sm" onChange={handleFormFields}></textarea>
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

export default NewReview