import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignedParkingTable = ({ assignedParkingData,onUnassign }) => {
    const [assignedParking, setAssignedParking] = useState(assignedParkingData);

    useEffect(() => {
        setAssignedParking(assignedParkingData);
    }, [assignedParkingData]);

    const handleUnassign = async (tenantId, LotNum) => {
        try {
            // Send a request to unassign parking
            await axios.post('http://localhost:9000/unassignTParking', {
                tenantId,
                LotNum
            });
            
            // Update the local state by removing the unassigned entry
            setAssignedParking((prevAssignedParking) => prevAssignedParking.filter((entry) => !(entry.tenantId._id === tenantId && entry.LotNum === LotNum)));
        
            // Call the callback function to fetch updated unassigned parking list
            onUnassign();} catch (error) {
            console.error('Error unassigning parking:', error);
        }
    };

    return (
        <>
        <div className='my-3'>
            <h2 className="mb-4 text-center">Assigned Parking Tenants</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Tenant Name</th>
                        <th>House Number</th>
                        <th>Parking Space</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {assignedParking.map((entry) => {
                    console.log('Entry:', entry);
                    return(
                    <tr key={entry._id}>
                        <td>{entry.tenantId && entry.tenantId.fname} {entry.tenantId && entry.tenantId.lname}</td>
                        <td>{entry.tenantId && entry.tenantId.HouseNum}</td>
                        <td>{entry.LotNum}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleUnassign(entry.tenantId._id, entry.LotNum)}>
                                Unassign
                            </button>
                        </td>
                    </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
        </>
    );
};

export default AssignedParkingTable;
