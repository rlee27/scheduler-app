import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
    { time: '8:00PM' },

]

function getNextSevenDates() {
    const today = new Date()
    const nextSevenDates = []

    for (let i=0; i<7; i++) {
        const nextDate = new Date(today)
        nextDate.setDate(today.getDate() + i)
        nextSevenDates.push(nextDate)
    }

    return nextSevenDates
}

const dates = getNextSevenDates()

const placeholders = []

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

const TimeTable = () => {
    const { id } = useParams()
    const [bookings, setBookings] = useState([])
    const [availabilities, setAvailabilities] = useState([])

    const fetchBookingData = () => {
        fetch(`/api/v1/coaches/${id}/bookings`)
        .then((response) => response.json())
        .then((data) => {
            setBookings(data)
            console.log(data)
        })
    }

    const fetchAvailabilityData = () => {
        fetch(`/api/v1/coaches/${id}/availabilities`)
        .then((response) => response.json())
        .then((data) => {
            setAvailabilities(data)
            console.log(data)
        })
    }

    useEffect(() => {
        fetchBookingData()
        fetchAvailabilityData()
    }, [id])

    return(
        <div className="container">
            <div className="table-responsive">
                <table className="table table-bordered text-center overflow-hidden">
                <thead>
                    <tr className="bg-light-gray">
                        <th className="text-uppercase">Time</th>
                        {dates.map(date => (
                            <th className="text-uppercase">{date.getDate()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timetableRows.map(row => (
                        <tr key={row.time}>
                            <td className="align-middle">{row.time}</td>
                            {renderBookingCells(bookings, availabilities,  convertTimeTo24HourFormat(row.time))}
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}
  
const renderBookingCells = (bookings,availabilities, time) => {
    const bookingRows = []
  
    for (let i = 0; i < dates.length; i++) {
        const bookingDate = dates[i]
        const booking = bookings.find(
            (b) =>
            b.date === bookingDate.toISOString().split('T')[0] &&
            b.time === time
        );
        const availability = availabilities.find(
            (a) =>
            a.date === bookingDate.toISOString().split('T')[0] &&
            a.time === time
        );
        const placeholder = placeholders.find(
            (p) =>
            p.date === bookingDate.toISOString().split('T')[0] &&
            p.time === time
        );
  
        if (booking) {
            let temp = {}
            temp.time = addOneHour(booking.time)
            temp.date = booking.date
            placeholders.push(temp)

            bookingRows.push(
                <td key={`${bookingDate.getDate()}-${bookingDate.getHours()}`} rowSpan={2} className="booking-cell bg-info">
                    {renderBookingForCell(booking)}
                </td>
            )
        } else if (availability) {
            let temp = {}
            temp.time = addOneHour(availability.time)
            temp.date = availability.date
            placeholders.push(temp)

            bookingRows.push(
                <td key={`${bookingDate.getDate()}-${bookingDate.getHours()}`} rowSpan={2} className="booking-cell bg-success">
                    Available
                </td>
            )

        } else if (placeholder) {
            bookingRows.push(null)
        } else {
            bookingRows.push(
                <td key={`${bookingDate.getDate()}-${bookingDate.getHours()}`} className="booking-cell"></td>
            );
        }
    }
    return bookingRows;
};
  
const renderBookingForCell = (booking) => {
    return booking ? <Booking booking={booking} /> : null;
};
  

const Booking = ({ booking }) => {
    return (
        <div className="">{booking.student_name}</div>
    );
};

function addOneHour(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const currentDate = new Date();

    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setHours(currentDate.getHours() + 1);
  
    const result = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
  
    return result;
}

export default TimeTable