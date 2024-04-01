import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';
import TenantNavbar from './TenantNavbar';
import { Link } from 'react-router-dom';

const RequestBooking = () => {
    const [bookingType, setBookingType] = useState('');
    const [eventName, setEventName] = useState('');
    const [attendees, setAttendees] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const { getUserFromLocalStorage } = useContext(AuthContext);
    const user = getUserFromLocalStorage();

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingRequest = {
            bookingType,
            eventName,
            attendees,
            requestedBy: user ? user._id : null,
            dateFrom,
            dateTo
        };

        axios.post('http://localhost:9000/booking/request', bookingRequest)
            .then(response => {
                alert("Booking request submitted successfully.");
                setBookingType('');
                setEventName('');
                setAttendees('');
                setDateFrom('');
                setDateTo('');
            })
            .catch(error => {
                console.log('Error submitting booking request:', error);
            });
    };

    return (
        <>
            <TenantNavbar />
            <div className="right-button">
        <Link to='/bookingstatus'><button type="submit" className="btn btn-secondary">View My Booking Status</button></Link>
                    </div>
            <div className="auth-form">
                <h2 className="text-center mb-4">Request Booking</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="bookingType">Booking Type</label>
                        <select
                            className="form-control"
                            id="bookingType"
                            value={bookingType}
                            onChange={(e) => setBookingType(e.target.value)}
                            required
                        >
                            <option value="">Select Booking Type</option>
                            <option value="room">Room</option>
                            <option value="hall">Community Hall</option>
                            <option value="GardenArea">GardenArea</option>

                            {/* Add more booking types as needed */}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="eventName">Event Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="eventName"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="attendees">Number of Attendees</label>
                        <input
                            type="number"
                            className="form-control"
                            id="attendees"
                            value={attendees}
                            onChange={(e) => setAttendees(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateFrom">Date From</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateFrom"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateTo">Date To</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateTo"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit Booking Request</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RequestBooking;
