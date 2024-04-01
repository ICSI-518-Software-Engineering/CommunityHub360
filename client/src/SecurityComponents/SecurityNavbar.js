import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth_files/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/SecurityNavbar.css';

export default function SecurityNavbar() {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="navbar-stable">Security Dashboard</span>
                
                    <div className="navbar-item">
                        <a className="nav-link" href="/security">Manage Guest Parking</a>
                    </div>
                    <div className="navbar-item">
                        <a className="nav-link" href="/ManageTParking">Manage Tenant Parking</a>
                    </div>

                    <div className="navbar-item">
                        <a className="nav-link" href="/BookingManage">Manage Booking</a>
                    </div>

                    <div className="navbar-item">
                            <a className="nav-link" href="/SChangePassword">Change Password</a>
                    </div>
            </div>
            <div>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}
