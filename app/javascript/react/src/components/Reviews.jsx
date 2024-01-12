import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NewReview from './NewReview'

const Reviews = () => {
    const { id } = useParams()
    const [reviewInfo, setReviewInfo] = useState([])
    const [needsReviews, setNeedsReviews] = useState([])

    const fetchReviewData = () => {
        fetch(`/api/v1/coaches/${id}/reviews_and_needs_reviews`)
        .then((response) => response.json())
        .then((data) => {
            setReviewInfo(data.reviews)
            setNeedsReviews(data.needsReviews)
            console.log(data)
        })
    }

    useEffect(() => {
        fetchReviewData()
    }, [id])

    const formatDateTime = (input) => {
        const options = { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC'}
        const formatted = new Date(input).toLocaleString('en-US', options)

        return formatted
    }

    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-around mt-3">
                <h1>
                    Your Reviews
                </h1>
                <button type="button" className="btn btn-primary position-relative" data-bs-toggle="modal" data-bs-target="#reviewModal" style={{"width" : "8em"}}>
                    Needs Reviews { needsReviews.length > 0 ? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{needsReviews.length}</span> : ''}
                </button>
            </div>
            <div className="d-flex vw-100 justify-content-around flex-wrap mt-5">
                {reviewInfo.map(reviewObj => (
                    <div className="card" style={{"width" : "15em"}}>
                        <div className="card-body">
                            <h6 className="card-title">Student: {reviewObj.booking.student.user.name}</h6>
                            <div className="card-text">From Session: {formatDateTime(reviewObj.booking.date)}</div>
                            <div className="card-text">Rating: {reviewObj.rating}</div>
                            <div className="card-text">Feedback: {reviewObj.feedback}</div>
                        </div>
                    </div>
                ))}
            </div>
            <NewReview needsReviews={needsReviews} />
        </div>
    )
}

export default Reviews