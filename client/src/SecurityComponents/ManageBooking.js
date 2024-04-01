import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SecurityNavbar from './SecurityNavbar';

const ManageBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the bookings on component mount
        axios.get('http://localhost:9000/api/bookings/security') // Adjust this endpoint as needed
            .then(response => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            });
    }, []);

    const handleAction = (bookingId, actionType) => {
        // Send a request to update the booking status
        axios.put(`http://localhost:9000/api/bookings/${bookingId}/${actionType}`) // Adjust this endpoint as needed
            .then(response => {
                // Update the booking in the state
                const updatedBookings = bookings.map(booking =>
                    booking._id === bookingId ? response.data : booking
                );
                setBookings(updatedBookings);
            })
            .catch(error => {
                console.error('Error updating booking:', error);
            });
    };

    if (loading) {
        return <div className="loading-message">Loading bookings...</div>;
    }

    return (
        <>
            <SecurityNavbar />
            <div className="manage-booking-container">
                <h1>Manage Booking Requests</h1>
                {bookings.length === 0 ? (
                    <div className="no-bookings-message">No booking requests at this time.</div>
                ) : (
                    <table className="table manage-booking-table">
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Date From</th>
                                <th>Date To</th>
                                <th>Number of Attendees</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking._id}>
                                    <td>{booking.eventName}</td>
                                    <td>{booking.dateFrom}</td>
                                    <td>{booking.dateTo}</td>
                                    <td>{booking.numberOfAttendees}</td>
                                    <td>{booking.status}</td>
                                    <td>
                                        {booking.status === 'Pending' && (
                                            <>
                                                <button onClick={() => handleAction(booking._id, 'confirm')}>Confirm</button>
                                                <button onClick={() => handleAction(booking._id, 'cancel')}>Cancel</button>
                                            </>
                                        )}
                                        {booking.status === 'Confirmed' && (
                                            <button onClick={() => handleAction(booking._id, 'complete')}>Complete</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default ManageBooking;
