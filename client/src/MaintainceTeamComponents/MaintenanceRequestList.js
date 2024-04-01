import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintenanceRequestList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const formatDateTime = (date, time) => {
        return `${new Date(date).toLocaleDateString()} at ${time}`;
    };


    useEffect(() => {
        // Fetch unresolved maintenance requests
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:9000/unresolvedMainReq');
                setRequests(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-3">
            <h2 className="text-center mb-4">Unresolved Maintenance Requests</h2>
            <div>
                {requests.length === 0 ? (
                    <div>No unresolved maintenance requests</div>
                ) : (
                    <ul className="list-group">
                        {requests.map(request => (
                            <li key={request._id} className="list-group-item mb-3">
                                <h5>Category: {request.category}</h5>
                                <p>Priority: {request.priority}</p>
                                <p>Description: {request.description}</p>
                                {request.availableDates.map((date, index) => (
                                    <p key={index}>Availability: {formatDateTime(date.date, date.fromTime)} to {formatDateTime(date.date, date.toTime)}</p>
                                ))}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
    
};

export default MaintenanceRequestList;
