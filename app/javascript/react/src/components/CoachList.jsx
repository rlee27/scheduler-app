import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const CoachList = () => {
    const [coachList, setCoachList] = useState([])

    const fetchCoachList = () => {
        fetch(`/api/v1/coaches/`)
        .then((response) => response.json())
        .then((data) => {
            setCoachList(data)
            console.log(data)
        })
    }

    useEffect(() => {
        fetchCoachList()
    }, [])

    if (coachList.length === 0) {
        return <div>Loading...</div>
    }

    return(
        <div>
            {coachList.map((coach) => 
                <div className="btn">{coach.name}</div>
            )}
        </div>
    )
}

export default CoachList