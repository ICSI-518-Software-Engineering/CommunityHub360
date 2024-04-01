import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-us-container" style={{ backgroundColor: '#282c34', color:'white', textAlign: 'center', padding: '20px' }}>
      <Link className='nav-item' to='/demo'><h1>Welcome to CommunityHub360</h1></Link>
      <p>
        CommunityHub360 is dedicated to redefining residential community management by leveraging state-of-the-art technology. Our platform streamlines communication and operations, fostering a connected and efficient community experience.
      </p>

      <h2>Experience the CommunityHub360 Advantage</h2>
      <p><strong>Technology-Driven, Community-Focused</strong></p>
        <strong>Powered by React:</strong> Our platform is built on React, providing a seamless and interactive experience.<br />
        <strong>User-Friendly Interface:</strong> We ensure an intuitive and accessible platform for all community members.<br />
        <strong>Adaptable and Robust:</strong> CommunityHub360 scales to accommodate evolving community needs.<br />

      <h2>Our Distinction</h2>
      <strong>Committed to Community Excellence</strong>
      <ul>
        <strong>Resident-Centric Service:</strong> We prioritize your satisfaction with dedicated support and engagement.<br />
        <strong>Ongoing Enhancements:</strong> Continuous innovation is our promise, with regular updates to empower your community.<br />
      </ul>

      <h2>Our Team</h2>
      <strong>A Collective of Community Champions</strong><br />
       Vignesh Appani<br></br>
       Sneha<br></br>
       Abhi<br></br>
       Srinivasulu<br></br>
       Shivani<br></br>
      
      <h2>Connect With Us</h2>
      <p>
        Discover more about CommunityHub360 and join us in this journey. Reach out to us at
         <a href="mailto:vappani@albany.edu">vappani@albany.edu</a> or <a href="tel:+123456789">+123 456 789</a> for partnership and support.
      </p>
    </div>
  );
};

export default AboutUs; 