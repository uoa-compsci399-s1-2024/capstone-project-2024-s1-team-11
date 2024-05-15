import React, { useState, useEffect } from 'react';
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
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarData, setAvatarData] = useState([]);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null); 

  useEffect(() => {
    const fetchAvatarData = async () => {
      try {
        let url = API + '/leaderboard/avatars';
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch avatar data');
        }
        const data = await response.json();
        setAvatarData(data);
      } catch (error) {
        console.error('Error fetching avatar data:', error);
      }
    };

    fetchAvatarData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        user_id: user_id,
        username: username,
        signature: signature
      };
  
      if (activeTab === 'username') {
        data.newUsername = newUsername;
      } else if (activeTab === 'email') {
        data.newEmail = newEmail;
      } else if (activeTab === 'avatar') {
        data.selectedAvatar = selectedAvatar;
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

  const handleAvatarClick = (avatarId) => {
    setSelectedAvatar(avatarId);
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
          <button
            className={activeTab === 'avatar' ? 'active' : ''}
            onClick={() => handleTabClick('avatar')}
          >
            Select Avatar
          </button>
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
          {activeTab === 'avatar' && (
            <div className="avatar-selection">
              <form onSubmit={handleSubmit}>
                <ul className="avatar-grid">
                {avatarData.map((entry) => (
                  <li key={entry.avatar_id}>
                    <div 
                      className={`avatar ${selectedAvatar === entry.avatar_id ? 'selected' : ''}`}
                      onClick={() => handleAvatarClick(entry.avatar_id)}
                    >
                      <img src={entry.imageUri} alt={`Avatar ${entry.avatar_id}`} />
                    </div>
                  </li>
                ))}
                </ul>
                <button type="submit">Save</button>
              </form>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default EditProfileModal;
