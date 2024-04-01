import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';
import TenantNavbar from './TenantNavbar';
const TenantGuestParkingStatus = () => {
    const [guestParkingRequests, setGuestParkingRequests] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && user._id) {
            axios.get(`http://localhost:9000/guestParking/tenantRequests/${user._id}`)
                .then(response => {
                    setGuestParkingRequests(response.data);
                })
                .catch(error => console.log('Error fetching guest parking requests:', error));
        }
    }, [user]);

    return (
        <>
        <TenantNavbar/>
            <h2 className="mb-4 text-center">My Guest Parking Requests</h2>
            <div className="container mt-5">
                <div className="row">
                    {guestParkingRequests.length > 0 ? guestParkingRequests.map(request => (
                        <div key={request._id} className="col-md-6 mb-3">
                            <div className="card">
                                <div className="card-header">
                                    Guest Name: {request.Name}
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Vehicle Number: {request.VehicleNum}</p>
                                    <p className="card-text">Lot Number: {request.LotNum || 'Not yet assigned'}</p>
                                    <p className="card-text">From: {new Date(request.requestedFrom).toLocaleDateString()}</p>
                                    <p className="card-text">To: {new Date(request.requestedTo).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center">No guest parking requests found.</p>}
                </div>
            </div>
        </>
    );
};

export default TenantGuestParkingStatus;
