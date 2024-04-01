import React, { useState,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';
import { Link } from 'react-router-dom';


import TenantNavbar from './TenantNavbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PostMaintenanceRequest = () => {
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [dateTimings, setDateTimings] = useState([{ date: new Date(), fromTime: '', toTime: '' }]);

    const { getUserFromLocalStorage } = useContext(AuthContext);
    const user = getUserFromLocalStorage();
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('12:00');

    const addBookingSlot = () => {
        setDates([...dates, selectedDate]);
        setTimes([...times, selectedTime]);
        // Reset selected date and time
        setSelectedDate(new Date());
        setSelectedTime('12:00');
      };
    

    const userId = user ? user._id : ""

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formattedDateTimings = dateTimings.map(dt => ({
            date: dt.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
            fromTime: dt.fromTime,
            toTime: dt.toTime
        }));

        const requestPayload = {
            priority,
            category,
            description,
            availableDates: formattedDateTimings,
            tenantId: userId
        };

        try {
            await axios.post('http://localhost:9000/maintenanceRequests', requestPayload);
            alert("Request Posted successfully");
            setPriority('');
            setCategory('');
            setDescription('');
            setDateTimings([{ date: new Date(), fromTime: '', toTime: '' }]);
        } catch (error) {
            console.error('Error submitting maintenance request:', error);
        }
    };

    const handleDateChange = (date, index) => {
        const newDateTimings = [...dateTimings];
        newDateTimings[index].date = date;
        setDateTimings(newDateTimings);
    };

    const handleTimeChange = (value, index, field) => {
        const newDateTimings = [...dateTimings];
        newDateTimings[index][field] = value;
        setDateTimings(newDateTimings);
    };

    const addNewTiming = () => {
        setDateTimings([...dateTimings, { date: new Date(), fromTime: '', toTime: '' }]);
    };

    const timeOptions = Array.from({ length: 24 }, (_, index) => {
        const hour = index < 10 ? `0${index}` : index;
        return <option key={index} value={`${hour}:00`}>{`${hour}:00`}</option>;
    });

    return (
        <>
        <TenantNavbar/>
        <div className="right-button">
        <Link to='/MyMainReq'><button type="submit" className="btn btn-secondary">View My Maintenance Requests</button></Link>
                    </div>
        <div className="auth-form">
            <h2 className="text-center mb-4">Post Maintenance Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="prioritySelect" className="form-label">Priority*</label>
                    <select id="prioritySelect" className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)} required>
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="categorySelect" className="form-label">Category*</label>
                    <select id="categorySelect" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        <option value="Electricity">Electricity</option>
                        <option value="House Service">House Service</option>
                        <option value="Plumbing">Plumbing</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="descriptionTextArea" className="form-label">Full Description*</label>
                    <textarea id="descriptionTextArea" className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                
                {dateTimings.map((timing, index) => (
                        <div key={index} className="row mb-3">
                            <div className="col-md-4">
                                <label htmlFor={`datePicker-${index}`} className="form-label">Select Date*</label>
                                <DatePicker
                                    selected={timing.date}
                                    onChange={(date) => handleDateChange(date, index)}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor={`fromTimeSelect-${index}`} className="form-label">From Time*</label>
                                <select id={`fromTimeSelect-${index}`} className="form-select" value={timing.fromTime} onChange={(e) => handleTimeChange(e.target.value, index, 'fromTime')} required>
                                    <option value="">Select From Time</option>
                                    {timeOptions}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor={`toTimeSelect-${index}`} className="form-label">To Time*</label>
                                <select id={`toTimeSelect-${index}`} className="form-select" value={timing.toTime} onChange={(e) => handleTimeChange(e.target.value, index, 'toTime')} required>
                                    <option value="">Select To Time</option>
                                    {timeOptions}
                                </select>
                            </div>
                        </div>
                    ))}
                    <div className="mb-3">
                        <button type="button" onClick={addNewTiming} className="btn btn-secondary">Add Another Timing</button>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                
        </div>
        
        </>
    );
};

export default PostMaintenanceRequest;