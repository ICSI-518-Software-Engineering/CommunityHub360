import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';

const MyInfo = () => {
    const { getUserFromLocalStorage } = useContext(AuthContext);
    const user = getUserFromLocalStorage();
    const [parkingLotNums, setParkingLotNums] = useState([]);

    useEffect(() => {
        const fetchParkingInfo = async () => {
            if (user && user._id) {
                try {
                    const response = await axios.get(`http://localhost:9000/api/tenantParking/${user._id}`);
                    setParkingLotNums(response.data.map(parking => parking.LotNum));
                } catch (error) {
                    console.error('Error fetching parking info:', error);
                    setParkingLotNums(['Not Assigned']);
                }
            }
        };

        fetchParkingInfo();
    }, [user]);

    if (!user) {
        return <div className="text-center"><p>Loading user information...</p></div>;
    }

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-header">
                    <h3>My Information</h3>
                </div>
                <div className="card-body">
                    <p className="card-text">Username: {user.username}</p>
                    <p className="card-text">First Name: {user.fname}</p>
                    <p className="card-text">Last Name: {user.lname}</p>
                    <p className="card-text">House Number: {user.HouseNum}</p>
                    <p className="card-text">
                        Parking Lot Numbers: {parkingLotNums.length > 0 ? parkingLotNums.join(', ') : 'Not Assigned'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyInfo;
