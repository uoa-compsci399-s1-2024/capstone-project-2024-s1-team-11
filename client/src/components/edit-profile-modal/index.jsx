import React, { useState } from 'react';
import Cookies from 'js-cookie';
import API from '../../../api';
import './styles.css'; 

const EditProfileModal = ({ onClose }) => {
  const user_id = Cookies.get("user_id");
  const username = Cookies.get("username");
  const signature = Cookies.get("signature");
  const [activeTab, setActiveTab] = useState('username'); 
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userId: user_id,
      };
  
      if (activeTab === 'username') {
        data.newUsername = newUsername;
      } else if (activeTab === 'email') {
        data.newUsername = newUsername;
      }
  
      const response = await fetch(API + `/profile/${activeTab}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      console.log('Response:', response); 
  
      if (response.ok) {
        console.log('PUT request was successful!');
    } else {
        console.error('PUT request failed:', response.status);
    }
  
      console.log(`${activeTab} updated successfully!`);
    } catch (error) {
      console.error(`Error updating ${activeTab}:`, error.message);
    }
  };

  return (
    <section className='profile-modal-overlay'>
      <section className='profile-modal'>          
        <h1>Edit Profile</h1>
        <button className="close-btn" onClick={onClose}>Close</button>
        <div className="tab-navigation">
          <button
            className={activeTab === 'username' ? 'active' : ''}
            onClick={() => handleTabClick('username')}
          >
            Edit Username
          </button>
          <button
            className={activeTab === 'email' ? 'active' : ''}
            onClick={() => handleTabClick('email')}
          >
            Edit Email
          </button>
          {/* Add avatar tab */}
        </div>
        <div className="tab-content">
          {activeTab === 'username' && (
            <form onSubmit={handleSubmit}>
              <label>New Username:</label>
              <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
              <button type="submit">Save</button>
            </form>
          )}
          {activeTab === 'email' && (
            <form onSubmit={handleSubmit}>
              <label>New Email:</label>
              <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              <button type="submit">Save</button>
            </form>
          )}
          {/* Add avatar selection tab content */}
        </div>
      </section>
    </section>
  );
};

export default EditProfileModal;
