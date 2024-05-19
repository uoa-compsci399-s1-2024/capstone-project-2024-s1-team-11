import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import API from '../../../api';
import './styles.css';
import {useNavigate} from "react-router-dom";


const EditProfileModal = ({ onClose }) => {
  // Accessing user credentials stored in cookies.
  const user_id = Cookies.get("user_id");
  const username = Cookies.get("username");
  const signature = Cookies.get("signature");

  // States for setting username and email.
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // States for setting user avatar.
  const [avatarsList, setAvatarsList] = useState([]);
  const [avatarIndex, setAvatarIndex] = useState(0);

  const navigate = useNavigate();

  // Edit-Profile-Modal state.
  const [activeTab, setActiveTab] = useState('username');

  useEffect(() => {
    const fetchAvatars = async () =>{
      const response = await fetch(API + `/avatars`)
      const avatars = await response.json();
      const avatarsList = Object.keys(avatars).map((key) => avatars[key]);
      setAvatarsList(avatarsList);
    }
      fetchAvatars();
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

      const response = await fetch(API + `/profile/${activeTab}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(`Error updating ${activeTab}:`, error.message);
    }
  };

  const handleNextAvatar = () => {
    setAvatarIndex((avatarIndex + 1) % avatarsList.length);
  };

  const handlePrevAvatar = () => {
    setAvatarIndex((avatarIndex - 1 + avatarsList.length) % avatarsList.length);
  };

  const handleSelectAvatar = async () => {
    const data = {
      user_id: user_id,
      username: username,
      signature: signature,
      avatar_id: avatarsList[avatarIndex].avatar_id
    };
    const response = await fetch(API + "/profile/setAvatar", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.status === 201){
      window.location.reload();
    }
  }

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
                <button onClick={handlePrevAvatar}>Previous</button>
                <img src={API + `/images/avatars/${avatarsList[avatarIndex].imageUri}`} alt="Avatar"
                     className="avatar-image"/>
                <button onClick={handleNextAvatar}>Next</button> <br></br>
                <button onClick={handleSelectAvatar}>Set as avatar</button>
              </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default EditProfileModal;
