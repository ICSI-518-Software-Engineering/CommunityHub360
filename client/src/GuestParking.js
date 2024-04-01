import React, { useState } from 'react';
import Navbar from './NavBar';
import axios from 'axios';

const GuestParkingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    licensePlate: '',
    state: '',
    vehicleType: 'car',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:9000/checkUser', formData);
        console.log(response.data);
        alert('Parking Booked Successfully!')
        setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            licensePlate: '',
            state: '',
            vehicleType: 'car',
            startDate: '',
            endDate: '',
          });
      } catch (error) {
        console.error('Error submitting form:', error.message);
      }
    console.log('Form submitted:', formData);
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
    const { startDate, endDate } = formData;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    

    return days * 10
  };


  return (
    
    <div  className="page">
    <div> <Navbar />
        <div className="auth-form" style={{ width: '80%' }}>
        <h2 style={{ textAlign: 'center' }}>Book Guest Parking</h2>
        <form>
        <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '48%' }}>
                <label>First Name:</label>
                <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                />
            </div>

            <div style={{ width: '48%' }}>
                <label>Last Name:</label>
                <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                />
            </div>
            </div>

            <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="tel"
          className="form-control"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          pattern="[0-9]{10}"  // This pattern enforces 10 digits
          required
        />
        <small>Format: 1234567890</small>
      </div>

            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '48%' }}>
                <label>License Plate:</label>
                <input
                type="text"
                className="form-control"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                required
                />
            </div>

            <div style={{ width: '48%' }}>
        <label>State:</label>
        <select
          className="form-control"
          name="state"
          value={formData.state}
          onChange={handleChange}
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
            </div>

            <div className="form-group">
            <label>Vehicle Type:</label>
            <select
                className="form-control"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
            >
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="truck">Truck</option>
                {/* Add more options as needed */}
            </select>
            </div>

            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '48%' }}>
                <label>Date of Start:</label>
                <input
                type="date"
                className="form-control"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                />
            </div>

            <div style={{ width: '48%' }}>
                <label>Date of End:</label>
                <input
                type="date"
                className="form-control"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                />
            </div>
            </div>

            <div>
                <div className="amount-box">
                    <div className="amount-label">Amount:</div>
                <div className="amount-value">
                    <strong>{calculateAmount()}$</strong>
                </div>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
            <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
            >
            Book the Parking
            </button>
            </div>

        </form>
        </div>
    
    </div>
    </div>
  );
};

export default GuestParkingForm;
