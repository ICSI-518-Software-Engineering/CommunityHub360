import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';

const ManageAnnouncements  = () => {
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState('');
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get('http://localhost:9000/getAnnouncements');
            setAnnouncements(response.data);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const deleteAnnouncement = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/deleteAnnouncement/${id}`);
            setAnnouncements(announcements.filter(announcement => announcement._id !== id));
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };
    const ViewAnnouncements = () => {
        return (
            <>
            <div className="card mx-4 mx-md-5 shadow-5-strong m-5">
                <div className="card-body text-center">
                    <h2 className="fw-bold mb-3">Existing Announcements</h2>
                    {announcements.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table mx-auto">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {announcements.map((announcement) => (
                                        <tr key={announcement._id}>
                                            <td>{announcement.header}</td>
                                            <td>{announcement.description}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => deleteAnnouncement(announcement._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No existing announcements</p>
                    )}
                </div>
            </div>
            </>
        );
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/createAnncc', { header, description })
            .then((res) => {alert("Announcement created successfully")
            setHeader('')
            setDescription('')
        })
            .catch((err) => alert('Error in creating announcement'));
            console.log(response.data);
    
        } catch (error) {
            console.error('Error adding announcement:', error);
        }
    };

    return (
        <>
        <AdminNav/>
        <section className="text-center">
            <div className="card mx-4 mx-md-5 shadow-5-strong m-4">
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">Add Announcement</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input type="text" className="form-control" placeholder="Announcement Title" value={header} onChange={(e) => setHeader(e.target.value)} />
                                </div>
                                <div className="form-outline mb-4">
                                    <textarea className="form-control" placeholder="Announcement Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">Add Announcement</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <ViewAnnouncements />
        </>
    );
};


export default ManageAnnouncements;