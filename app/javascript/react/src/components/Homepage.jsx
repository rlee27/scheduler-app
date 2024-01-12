import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Homepage = () => {
    const [coachList, setCoachList] = useState([])
    const [studentList, setStudentList] = useState([])

    const fetchStudentList = () => {
        fetch('/api/v1/students')
        .then((response) => response.json())
        .then((data) => {
            setStudentList(data)
            console.log(data)
        })
    }

    const fetchCoachList = () => {
        fetch('/api/v1/coaches')
        .then((response) => response.json())
        .then((data) => {
            setCoachList(data)
            console.log(data)
        })
    }

    useEffect(() => {
        fetchStudentList()
    }, [])

    useEffect(() => {
        fetchCoachList()
    }, [])

    return(
        <div>
            <div>
                <div>
                    Coach?
                </div>
                {coachList.map((coach) => 
                    <Link to={`/coaches/${coach.id}`} className="btn">{coach.name}</Link>
                )}
            </div>
            <div>
                <div>
                    Student?
                </div>
                {studentList.map((student) => 
                    <Link to={`/students/${student.id}`} className="btn">{student.name}</Link>
                )}
            </div>
        </div>
    )
}

export default Homepage