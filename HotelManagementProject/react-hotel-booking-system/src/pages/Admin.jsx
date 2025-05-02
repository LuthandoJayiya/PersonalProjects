// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/admin.css';
import PropTypes from 'prop-types';

const AdminPage = ({ username }) => {
  const [hotelOwners, setHotelOwners] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [newOwner, setNewOwner] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    openingBalance: '',
  });

  // Fetch existing hotel owners
  useEffect(() => {
    axios.get('http://localhost:8080/api/public/hotelOwners')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setHotelOwners(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching hotel owners:', error);
      });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOwner((prevOwner) => ({ ...prevOwner, [name]: value }));
  };

  const handleAddOwner = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/hotelOwner', newOwner)
      .then((response) => {
        console.log('Owner added successfully:', response.data);
        setHotelOwners((prevOwners) => [...prevOwners, response.data]);
        setNewOwner({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          openingBalance: '',
        });
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Error adding owner:', error);
      });
  };

  return (
    <div className="admin-page">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <img src="/path/to/logo.png" alt="Logo" className="logo" />
        </div>
        <div className="navbar-right">
          <img src="/path/to/avatar.png" alt="Avatar" className="avatar" />
          <span className="greeting">Hi, {username}</span>
          <button className="sign-out">Sign Out</button>
        </div>
      </div>

      {/* Sidebar and Content */}
      <div className="admin-body">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Admin Panel</h2>
          <ul className="sidebar-links">
            <li><a href="#add-owner" onClick={() => setShowForm(!showForm)}>Add Hotel Owner</a></li>
            <li><a href="/owners-overview">Owner Overview</a></li>
            <li><a href="/account-statement">Account Statement</a></li>
            <li><a href="/global-charges">Global Charges</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="content">
          <h1>Welcome, Admin!</h1>

          <div className="cards-wrapper">
            {/* Owner Overview Card */}
            <div className="card">
              <h3>Owner Overview</h3>
              {hotelOwners.length > 0 ? (
                <ul>
                  {hotelOwners.map((owner) => (
                    <li key={owner.id}>
                      {owner.firstName} {owner.lastName} - {owner.email} (Balance: £{owner.currentBalance})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No owners found.</p>
              )}
            </div>

            {/* Global Charges Card */}
            <div className="card">
              <h3>Global Charges</h3>
              <table className="charges-table">
                <thead>
                  <tr>
                    <th>Charge Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hotel Base Charge</td>
                    <td>£100 per month</td>
                  </tr>
                  <tr>
                    <td>Room Charge</td>
                    <td>£10 per month</td>
                  </tr>
                  <tr>
                    <td>Transaction Fee</td>
                    <td>5% per booking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Owner Form */}
          {showForm && (
            <div className="card add-owner-form">
              <h3>Add Hotel Owner</h3>
              <form onSubmit={handleAddOwner}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={newOwner.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={newOwner.lastName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newOwner.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newOwner.password}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="openingBalance"
                  placeholder="Opening Balance"
                  value={newOwner.openingBalance}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="submit-btn">Add Owner</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// AdminPage.propTypes = {
//   username: PropTypes.string.isRequired,
// };

export default AdminPage;
