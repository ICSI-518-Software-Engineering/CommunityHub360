import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';
import TenantNavbar from './TenantNavbar';
import { Link } from 'react-router-dom';
const RequestGuestParking = () => {
    const [carType, setCarType] = useState('');
    const [vehicleNum, setVehicleNum] = useState('');
    const [name, setName] = useState('');
    const [requestedFrom, setRequestedFrom] = useState('');
    const [requestedTo, setRequestedTo] = useState('');
    
    const { getUserFromLocalStorage } = useContext(AuthContext);
    const user = getUserFromLocalStorage();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestPayload = {
            carType,
            VehicleNum: vehicleNum,
            Name: name,
            requestedBy: user ? user._id : null,
            requestedFrom,
            requestedTo
        };

        axios.post('http://localhost:9000/guestParking/request', requestPayload)
            .then(response => {
                // Handle the response, maybe clear the form or show a success message
                console.log('Parking Request Submitted:', response.data);
                alert("request submitted succesfully.")
                setCarType('')
                setVehicleNum('')
                setName('')
                setRequestedFrom('')
                setRequestedTo('')
            })
            .catch(error => {
                console.log('Error submitting parking request:', error);
            });
    };

    const usStates = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
        'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
        'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ];

      const calculateAmount = () => {
        const start = new Date(requestedFrom);
        const end = new Date(requestedTo);
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
        
    
        return days * 10
      };

    return (
        <>
        <TenantNavbar/>
        <div className="right-button">
        <Link to='/viewMyGPStatus'><button type="submit" className="btn btn-secondary">View My Guest Parking Status</button></Link>
                    </div>
        <div className="auth-form">
            <h2 className="text-center mb-4">Request Guest Parking</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="carType" className="form-group">Car Type</label>
                    <select
                        className="form-control" 
                        id="carType" 
                        value={carType} 
                        onChange={(e) => setCarType(e.target.value)} 
                        required
                    >
                        <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="truck">Truck</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleNum" className="form-label">Vehicle Number</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="vehicleNum" 
                        value={vehicleNum} 
                        onChange={(e) => setVehicleNum(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                <label>State:</label>
                        <select
                        className="form-control"
                        name="state"
                        required
                        >
                        <option value="">Select a state</option>
                        {usStates.map((state) => (
                            <option key={state} value={state}>
                            {state}
                            </option>
                        ))}
                        </select>
                    

                </div>

                <div className="form-group">
                    <label htmlFor="name" className="form-label">Guest's Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="requestedFrom" className="form-label">Requested From</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="requestedFrom" 
                        value={requestedFrom} 
                        onChange={(e) => setRequestedFrom(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="requestedTo" className="form-label">Requested To</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="requestedTo" 
                        value={requestedTo} 
                        onChange={(e) => setRequestedTo(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                <div className="amount-box">
                    <div className="amount-label">Amount:</div>
                <div className="amount-value">
                    <strong>{calculateAmount()}$</strong>
                </div>
                </div>
            </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit Request</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default RequestGuestParking;
