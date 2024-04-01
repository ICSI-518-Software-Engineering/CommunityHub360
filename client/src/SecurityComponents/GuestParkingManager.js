import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GuestParkingManager = () => {
    const [requests, setRequests] = useState([]);
    const [assignedParkings, setAssignedParkings] = useState([]);
    const [selectedLotNum, setSelectedLotNum] = useState('');

    useEffect(() => {
        // Fetch all guest parking requests
        axios.get('http://localhost:9000/guestParking/requests')
            .then(response => setRequests(response.data))
            .catch(error => console.log('Error fetching requests:', error));

        // Fetch all assigned parkings
        axios.get('http://localhost:9000/guestParking/assigned')
            .then(response => setAssignedParkings(response.data))
            .catch(error => console.log('Error fetching assigned parkings:', error));
    }, []);

    const handleAssignParking = (requestId) => {
        axios.put(`http://localhost:9000/guestParking/assign/${requestId}`, { LotNum: selectedLotNum })
            .then(response => {
                // Update states after assignment
                setRequests(requests.filter(request => request._id !== requestId));
                setAssignedParkings([...assignedParkings, response.data]);
            })
            .catch(error => console.log('Error assigning parking:', error));
    };

    return (
        <div className="container mt-3">
            <h2 className="text-center mb-4">Manage Guest Parking Requests</h2>
            
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h4>Unassigned Requests</h4>
                    {requests.length > 0 ? requests.map(request => (
                        <div key={request._id} className="card mb-3">
                            <div className="card-body">
                                <ul className="list-unstyled">
                                    <li><strong>Request ID:</strong> {request._id}</li>
                                    <li><strong>Vehicle:</strong> {request.VehicleNum}</li>
                                    <li><strong>Name:</strong> {request.Name}</li>
                                    <li><strong>Requested From:</strong> {new Date(request.requestedFrom).toLocaleDateString()}</li>
                                    <li><strong>Requested To:</strong> {new Date(request.requestedTo).toLocaleDateString()}</li>
                                </ul>
                                <div className="d-flex justify-content-between align-items-center">
                                    <select className="form-select" onChange={(e) => setSelectedLotNum(e.target.value)}>
                                        <option value="">Select Lot Number</option>
                                        {[...Array(15).keys()].map(num => (
                                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                                        ))}
                                    </select>
                                    <button className="btn btn-primary" onClick={() => handleAssignParking(request._id)}>Assign</button>
                                </div>
                            </div>
                        </div>
                    )) : <p>No unassigned requests.</p>}
                </div>
    
                <div className="col-md-6">
                    <h4>Assigned Parkings</h4>
                    {assignedParkings.length > 0 ? assignedParkings.map(parking => (
                        <div key={parking._id} className="card p-2 mb-2">
                            <ul className="list-unstyled">
                                <li><strong>Lot Number:</strong> {parking.LotNum}</li>
                                <li><strong>Vehicle:</strong> {parking.VehicleNum}</li>
                                <li><strong>Name:</strong> {parking.Name}</li>
                                <li><strong>From:</strong> {new Date(parking.requestedFrom).toLocaleDateString()}</li>
                                <li><strong>To:</strong> {new Date(parking.requestedTo).toLocaleDateString()}</li>
                            </ul>
                        </div>
                    )) : <p>No assigned parkings.</p>}
                </div>
            </div>
        </div>
    );
    
    
};

export default GuestParkingManager;
