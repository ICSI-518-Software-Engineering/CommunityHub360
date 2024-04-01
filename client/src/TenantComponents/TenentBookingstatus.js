import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';
import TenantNavbar from './TenantNavbar';

const TenentBookingstatus = () => {
    const [bookingRequests, setBookingRequests] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && user._id) {
            axios.get(`http://localhost:9000/booking/tenantRequests/${user._id}`)
                .then(response => {
                    setBookingRequests(response.data);
                })
                .catch(error => console.log('Error fetching booking requests:', error));
        }
    }, [user]);

    return (
        <>
            <TenantNavbar/>
            <h2 className="mb-4 text-center">My Booking Requests</h2>
            <div className="container mt-5">
                {bookingRequests.length > 0 ? bookingRequests.map((request, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-header">
                            Event Name: {request.eventName}
                        </div>
                        <div className="card-body">
                            <p>Booking Type: {request.bookingType}</p>
                            <p>Number of Attendees: {request.attendees}</p>
                            <p>Date From: {new Date(request.dateFrom).toLocaleDateString()}</p>
                            <p>Date To: {new Date(request.dateTo).toLocaleDateString()}</p>
                            <p>Status: {request.isAccepted ? 'Accepted' : 'Not Accepted'}</p>
                        </div>
                    </div>
                )) : <p className="text-center">No booking requests found.</p>}
            </div>
        </>
    );
};

export default TenentBookingstatus;
