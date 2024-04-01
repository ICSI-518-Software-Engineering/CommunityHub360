import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ViewAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/getAnnouncements')
            .then(response => {
                const sortedAnnouncements = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                setAnnouncements(sortedAnnouncements);
            })
            .catch(error => {
                console.error('Error fetching announcements:', error);
            });
    }, []);

    // Function to format date and time
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    };

    return (
        <>
        <div className="card mx-4 mx-md-5 shadow-5-strong m-5">
        <div>
            <h2 className="mb-4 text-center">Announcements</h2>
            <div className="container mt-5">
                <div className="row">
                    {announcements.map((announcement, index) => (
                        <div key={index} className="col-md-6 mb-3">
                            <div className="card">
                                <div className="card-header">
                                    Announcement: {announcement.header}
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{announcement.description}</p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Posted on: {formatDateTime(announcement.createdDate)}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default ViewAnnouncements;
