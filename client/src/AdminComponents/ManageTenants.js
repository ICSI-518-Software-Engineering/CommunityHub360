import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';

const ManageTenants = () => {
    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/getTenants')
            .then(response => {
                setTenants(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the tenants!', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9000/deleteTenant/${id}`)
            .then(() => {
                setTenants(tenants.filter(tenant => tenant._id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the tenant!', error);
            });
    };

    const handleAccept = (id) => {
        axios.post('http://localhost:9000/acceptTenant', { _id: id })
            .then(() => {
                setTenants(tenants.map(tenant => {
                    if (tenant._id === id) {
                        return { ...tenant, isAccepted: true };
                    }
                    return tenant;
                }));
            })
            .catch(error => {
                console.error('There was an error accepting the tenant!', error);
            });
    };

    return (
        <>
        <AdminNav/>
        <div className="card mx-4 mx-md-5 shadow-5-strong m-5">
        <div className="container mt-4">
            <h2>Tenant's Information</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>House No.</th>
                        <th>Number</th>
                        <th>Actions</th>
                        <th>Acceptance</th>
                    </tr>
                </thead>
                <tbody>
                    {tenants.map(tenant => (
                        <tr key={tenant._id}>
                            <td>{tenant.fname} {tenant.lname}</td>
                            <td>{tenant.HouseNum}</td>
                            <td>{tenant.phoneNum}</td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDelete(tenant._id)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                {tenant.isAccepted ? (
                                    <span className="badge bg-success">Accepted</span>
                                ) : (
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => handleAccept(tenant._id)}>
                                        Accept
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        </>
    );
};

export default ManageTenants;