import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth_files/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MaintenanceNav.css';

export default function MaintenanceNav() {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="navbar-stable">Maintenance Dashboard</span>
                    <div className="navbar-item">
                        <a className="nav-link" href="/maintenance">Maintenance Request List</a>
                    </div>
                    <div className="navbar-item">
                        <a className="nav-link" href="/ResolvedMainReqList">Resolved Request List</a>
                    </div>

                    <div className="navbar-item">
                            <a className="nav-link" href="/MChangePassword">Change Password</a>
                        </div>
            </div>
            <div>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}
