import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaintenanceNav from './MaintenanceNav'

const ResolvedRequestList = () => {
    const [resolvedRequests, setResolvedRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const formatDateTime = (date, time) => {
        return `${new Date(date).toLocaleDateString()} at ${time}`;
    };

    useEffect(() => {
        // Fetch resolved maintenance requests
        const fetchResolvedRequests = async () => {
            try {
                const response = await axios.get('http://localhost:9000/resolvedMainReq');
                setResolvedRequests(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchResolvedRequests();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <MaintenanceNav/>
        <div className="container mt-3">
            <h2 className="text-center mb-4">Resolved Maintenance Requests</h2>
            <div>
                {resolvedRequests.length === 0 ? (
                    <div>No resolved maintenance requests</div>
                ) : (
                    <ul className="list-group">
                        {resolvedRequests.map(request => (
                            <li key={request._id} className="list-group-item mb-3">
                                <h5>Category: {request.category}</h5>
                                <p>Priority: {request.priority}</p>
                                <p>Description: {request.description}</p>
                                <p>Resolved Date: {request.isresolved.resolvedDate ? new Date(request.isresolved.resolvedDate).toLocaleString() : 'Not available'}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        </>
    );
};

export default ResolvedRequestList;
