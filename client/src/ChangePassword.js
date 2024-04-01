import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './Auth_files/AuthProvider';
import './ChangePassword.css';

const ChangePassword = () => {
    const { getUserFromLocalStorage } = useContext(AuthContext);
    const user = getUserFromLocalStorage();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:9000/change-password', {
                userId: user._id,
                oldPassword, 
                newPassword
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="change-password-container my-5">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Old Password</label>
                    <input type="password" className="form-control" onChange={(e) => setOldPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
