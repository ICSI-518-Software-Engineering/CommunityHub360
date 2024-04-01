import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth_files/AuthProvider';
import './TenantNavBar.css';

export default function TenantNavbar() {
    const navigate = useNavigate();
    const { getUserFromLocalStorage,logOut } = useContext(AuthContext);
    const user = getUserFromLocalStorage();

    console.log("saved user is ",user);
    const handleLogout = () => {
        logOut();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-stable">
                    <a className="navbar-stable" href='/tenant' >Hello, {user?.fname}</a>
                </div>
              
                <div className="navbar-item">
                        <a className="nav-link" href="/tenant">Announcements</a>
                </div>
                <div className="navbar-item">
                        <a className="nav-link" href="/postMainReq">Maintenance Request</a>
                </div>
                <div className="navbar-item">
                        <a className="nav-link" href="/reqGP">Guest Parking</a>
                </div>
                <div className="navbar-item">
                        <a className="nav-link" href="/bookingrequest">Booking</a>
                </div>
                <div className="navbar-item">
                        <a className="nav-link" href="/B&SForum">B&SForum</a>
                </div>

                <div className="navbar-item">
                        <a className="nav-link" href="/aboutus">About</a>
                </div>
            </div>
            <div className='navbar-right'>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}
