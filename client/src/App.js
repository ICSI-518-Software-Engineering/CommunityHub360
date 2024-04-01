import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedElement from './Auth_files/ProtectedElement';
import { AuthProvider } from  './Auth_files/AuthProvider';

import Home from './Home';
import Navbar from './NavBar';
import GuestParking from './GuestParking';
import AboutUs from './Aboutus';
import Login from './Login';
import SignUp from './SignUp';
import ManageTenants from './AdminComponents/ManageTenants';
import ManageAnnouncements from './AdminComponents/ManageAnnouncements';
import ViewAnnouncements from './TenantComponents/ViewAnnouncements';
import PostMaintenanceRequest from './TenantComponents/PostMaintenanceRequest';
import MaintenanceRequestList from './MaintainceTeamComponents/MaintenanceRequestList';
import TenantMaintenanceRequests from './TenantComponents/TenantMaintenanceRequests';
import RequestGuestParking from './TenantComponents/RequestGuestParking';
import GuestParkingManager from './SecurityComponents/GuestParkingManager';
import TenantGuestParkingStatus from './TenantComponents/TenantGuestParkingStatus';
import RequestBooking from './TenantComponents/RequestBooking';
import TenentBookingstatus from './TenantComponents/TenentBookingstatus';



import AdminDash from './AdminComponents/AdminDash';
import MaintenanceDash from './MaintainceTeamComponents/MaintenanceDash';
import TenantDash from './TenantComponents/TenantDash';
import SecurityDash from './SecurityComponents/SecurityDash';
import AssignTenantParking from './SecurityComponents/AssignTenantParking';
import ResolvedRequestList from './MaintainceTeamComponents/ResolvedRequestList';
import Demo from './Demo';
import Payment from './TenantComponents/Payment';

import AChangePass from './AdminComponents/AChangePass';
import TChangePass from './TenantComponents/TChangePass';
import MChangePass from './MaintainceTeamComponents/MChangePass';
import SChangePass from './SecurityComponents/SChangePass';
import ManageBooking from './SecurityComponents/ManageBooking';

function App() {
    return (
        <AuthProvider>
          <Router>
            <Routes>
            <Route path="/admin"  element={<ProtectedElement><AdminDash /></ProtectedElement> } />
            <Route path="/maintenance" element={<ProtectedElement><MaintenanceDash /></ProtectedElement> } />
                <Route path="/tenant"  element={<ProtectedElement><TenantDash /></ProtectedElement> } />
                <Route path="/security"   element={<ProtectedElement><SecurityDash /></ProtectedElement> } />
            

                <Route path="/home" element={<Home />}/>
                <Route path="/demo" element={<Demo />}/>
                <Route path="/navbar" element={<Navbar />}/>
                <Route path="/guestparking" element={<GuestParking />}/>
                <Route path="/aboutus" element={<AboutUs />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/" element={<Demo />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/AChangePassword" element={<ProtectedElement>< AChangePass/></ProtectedElement>}/>
                <Route path="/TChangePassword" element={<ProtectedElement><TChangePass /></ProtectedElement>}/>
                <Route path="/MChangePassword" element={<ProtectedElement><MChangePass /></ProtectedElement>}/>
                <Route path="/SChangePassword" element={<ProtectedElement><SChangePass /></ProtectedElement>}/>
                <Route path="/manageAnnounc" element={<ProtectedElement><ManageAnnouncements /></ProtectedElement>}/>
                <Route path="/manageTenant" element={<ProtectedElement><ManageTenants /></ProtectedElement>}/>
                <Route path="/viewAnnounc" element={<ProtectedElement><ViewAnnouncements /></ProtectedElement>}/>
                <Route path="/payment" element={<ProtectedElement><Payment /></ProtectedElement>}/>
                <Route path="/MyMainReq" element={<ProtectedElement><TenantMaintenanceRequests /></ProtectedElement>}/>
                <Route path="/manageGP" element={<ProtectedElement><GuestParkingManager /></ProtectedElement>}/>
                <Route path="/viewMyGPStatus" element={<ProtectedElement><TenantGuestParkingStatus /></ProtectedElement>}/>
                <Route path="/postMainReq" element={<ProtectedElement><PostMaintenanceRequest /></ProtectedElement>}/>
                <Route path="/MainReqList" element={<ProtectedElement><MaintenanceRequestList /></ProtectedElement>}/>
                <Route path="/ResolvedMainReqList" element={<ProtectedElement><ResolvedRequestList /></ProtectedElement>}/>
                <Route path="/bookingrequest" element={<ProtectedElement><RequestBooking /></ProtectedElement>}/>
                <Route path="/reqGP" element={<ProtectedElement><RequestGuestParking /></ProtectedElement>}/>
                <Route path="/bookingstatus" element={<ProtectedElement><TenentBookingstatus /></ProtectedElement>}/>
                <Route path="/ManageTParking" element={<ProtectedElement><AssignTenantParking /></ProtectedElement>}/>
                <Route path="/BookingManage" element={<ProtectedElement><ManageBooking /></ProtectedElement>}/>
                
                
            </Routes>
      </Router>
    </AuthProvider>
      );

};

export default App;