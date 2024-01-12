import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import CoachList from './CoachList'

const StudentView = () => {
    const { id } = useParams()
    const [student, setStudent] = useState(null)
    const [coachList, setCoachList] = useState([])

    const fetchStudentData = () => {
        fetch(`/api/v1/students/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setStudent(data)
            console.log(data)
        })
    }

    const fetchCoachList = () => {
        fetch(`/api/v1/coaches`)
        .then((response) => response.json())
        .then((data) => {
            setCoachList(data)
            console.log(data)
        })
    }

    useEffect(() => {
        fetchStudentData()
        fetchCoachList()
    }, [id])


    if (!student) {
        return <div>Loading...</div>
    }
    
    return(
        <div>
            <div>Hello {student.name}</div>
            <div>Which coach are you interested in scheduling with?</div>
            {coachList.map(coach => (
                <Link to={`coaches/${coach.id}`} className="btn">{coach.name}</Link>
            ))}
        </div>
    )
}


export default StudentView