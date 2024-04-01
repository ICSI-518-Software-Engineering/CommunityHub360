import React,{useContext} from 'react'
import { useNavigate, } from 'react-router-dom';
import { AuthContext } from '../Auth_files/AuthProvider';
import './AdminNav.css';

export default function AdminNav() {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logOut();
        navigate('/login');
    };

    return(
        <nav className="navbar">
                <div className="navbar-left">
                    <span className="navbar-stable">Hello, Admin</span>

                        <div className="navbar-item">
                            <a className="nav-link" href="/manageTenant">Manage Tenants</a>
                        </div>
                        <div className="navbar-item">
                            <a className="nav-link" href="/manageAnnounc">Manage Announcements</a>
                        </div>
                        <div className="navbar-item">
                            <a className="nav-link" href="/admin">View Announcements</a>
                        </div>
                        <div className="navbar-item">
                            <a className="nav-link" href="/AChangePassword">Change Password</a>
                        </div>
                </div>
                <div>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
  )
}
