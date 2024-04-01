import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';
import TenantNavbar from './TenantNavbar';

const TenantMaintenanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user ? user._id : "";

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:9000/maintenanceRequests/tenant/${userId}`)
        .then(response => {
          setRequests(response.data);
        })
        .catch(error => {
          console.error('Error fetching maintenance requests:', error);
        });
    }
  }, [userId]);

  const handleStatusChange = (requestId) => {
    axios.put(`http://localhost:9000/maintenanceRequests/update/${requestId}`)
      .then(response => {
        // The updatedRequest now includes the isresolved object with status and resolvedDate
        const updatedRequest = response.data;
        const updatedRequests = requests.map(request => 
          request._id === requestId ? { ...request, isresolved: updatedRequest.isresolved } : request
        );
        setRequests(updatedRequests);
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  return (
    <>
      <TenantNavbar/>
      <div className="container mt-3">
        <h2 className="text-center mb-4">My Maintenance Requests</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request._id}>
                <td>{request.category}</td>
                <td>{request.description}</td>
                <td>{request.isresolved && request.isresolved.status ? 'Resolved' : 'Unresolved'}</td>
                <td>
                  <button 
                    className={`btn ${request.isresolved && request.isresolved.status ? 'btn-warning' : 'btn-success'}`}
                    onClick={() => handleStatusChange(request._id)}
                  >
                    {request.isresolved && request.isresolved.status ? 'Mark as Unresolved' : 'Mark as Resolved'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TenantMaintenanceRequests;
