import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';
import AssignedParkingTable from './AssignedParkingTable';
import SecurityNavbar from './SecurityNavbar'

const AssignTenantParking = () => {
    const { getUserFromLocalStorage } = useContext(AuthContext);
    const user = getUserFromLocalStorage();

    const [parkingSpaces, setParkingSpaces] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [selectedTenant, setSelectedTenant] = useState('');
    const [selectedParkingSpace, setSelectedParkingSpace] = useState('');
    const [validationError, setValidationError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [assignedParkingData, setAssignedParkingData] = useState([]);

    const fetchAssignedParkingData = async () => {
        try {
            // Fetch assigned parking data
            const assignedParkingResponse = await axios.get('http://localhost:9000/getAssignedParking');
            const assignedParkingData = assignedParkingResponse.data;
    
            // Fetch unassigned parking spaces
            const unassignedParkingResponse = await axios.get('http://localhost:9000/unassignedParkingSpaces');
            const unassignedParkingData = unassignedParkingResponse.data;
    
            // Fetch all tenants (both assigned and unassigned)
            const tenantsResponse = await axios.get('http://localhost:9000/getValidTenants');
            const allTenants = tenantsResponse.data;

            setAssignedParkingData(assignedParkingData);
            setParkingSpaces(unassignedParkingData);
            setTenants(allTenants);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch data initially
        fetchAssignedParkingData();
    }, []);
    

    // Function to fetch updated unassigned parking list
    const fetchUnassignedParkingSpaces = async () => {
        try {
            const response = await axios.get('http://localhost:9000/unassignedParkingSpaces');
            setParkingSpaces(response.data);
        } catch (error) {
            console.error('Error fetching unassigned parking spaces:', error);
        }
    };


    const handleAssignParking = () => {
        if (!selectedTenant || !selectedParkingSpace) {
            // Check if both fields are selected, show validation error if not
            setValidationError('Please select both a tenant and a parking space.');
            return;
        }
    
        // Clear validation error and success message
        setValidationError('');
        setSuccessMessage('');
    
        axios
            .post('http://localhost:9000/assignTParking', {
                tenantId: selectedTenant,
                LotNum: selectedParkingSpace,
                assignedBy: user,
            })
            .then((response) => {
                if (response.status === 200) {
                    // Update the success message
                    setSuccessMessage('Parking space assigned successfully.');
    
                    // Clear the selected values
                    setSelectedTenant('');
                    setSelectedParkingSpace('');
                    fetchAssignedParkingData(); // Refresh all data including parking spaces and tenants
                }
            })
            .catch((error) => {
                console.error('Error assigning parking space:', error);
            });
    };

    return (
        <>
        < SecurityNavbar/>
        <div className="auth-form">
            <h2 className="text-center mb-4">Assign Tenant Parking Spaces</h2>
            {validationError && (
                <div className="alert alert-danger">{validationError}</div>
            )}
            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}
            <div className="mb-3">
                <label htmlFor="tenantSelect" className="form-label">
                    Select Tenant:
                </label>
                <select
                    id="tenantSelect"
                    className="form-select"
                    value={selectedTenant}
                    onChange={(e) => setSelectedTenant(e.target.value)}
                    required
                >
                    <option value="">Select Tenant</option>
                    {tenants.map((tenant) => (
                        <option key={tenant._id} value={tenant._id}>
                            {tenant.fname} {tenant.lname}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="parkingSpaceSelect" className="form-label">
                    Select Parking Space:
                </label>
                <select
                    id="parkingSpaceSelect"
                    className="form-select form-select-sm"
                    value={selectedParkingSpace}
                    onChange={(e) => setSelectedParkingSpace(e.target.value)}
                    required
                >
                    <option value="">Select Parking Space</option>
                    {parkingSpaces
                        .filter((space) => !space.isAssigned) // Filter unassigned parking spaces
                        .map((space) => (
                            <option key={space.LotNum} value={space.LotNum}>
                                {space.LotNum}
                            </option>
                        ))}
                </select>
            </div>
            <button className="btn btn-primary" onClick={handleAssignParking}>
                Assign Parking Space
            </button>
            </div>
            <div>

            <AssignedParkingTable assignedParkingData={assignedParkingData} onUnassign={fetchUnassignedParkingSpaces} />
        
        </div>
        
        </>
    );
};

export default AssignTenantParking;
