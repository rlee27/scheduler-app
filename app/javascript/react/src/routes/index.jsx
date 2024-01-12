import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../components/Homepage'
import CoachView from '../components/CoachView'
import SelectCoach from '../components/SelectCoach'
import Reviews from '../components/Reviews'
import StudentView from '../components/StudentView'

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coaches/:id" element={<CoachView />} />
            <Route path="/coaches/:id/reviews" element={<Reviews />} />
            <Route path="/students/:id" element={<SelectCoach />} />
            <Route path="/students/:studentId/coaches/:coachId" element={<StudentView />} />
        </Routes>
    </Router>
)