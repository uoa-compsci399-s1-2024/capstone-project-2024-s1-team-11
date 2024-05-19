import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import API from '../../../api';
import './styles.css';


const EditProfileModal = ({ onClose }) => {
  // Accessing user credentials stored in cookies.
  const user_id = Cookies.get("user_id");
  const username = Cookies.get("username");
  const signature = Cookies.get("signature");

  // States for setting username and email.
  const [newAlias, setNewAlias] = useState('');

  // States for changing email
  // User will be asked for password when changing email, for security reasons.
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for changing password.
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // States for setting user avatar.
  const [avatarsList, setAvatarsList] = useState([]);
  const [avatarIndex, setAvatarIndex] = useState(0);

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

  // Handler for opening a modal for editing either alias, email, password, avatar.
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handler for submitting new alias.
  const handleSubmitAlias = async () => {
    const data = {
      user_id: user_id,
      username: username,
      signature: signature,
      alias: newAlias
    };
    const response = await fetch(API + "/profile/setAlias", {
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

  // Handler for submitting new email.
  const handleSubmitEmail = async () => {
    const data = {
      user_id: user_id,
      username: username,
      signature: signature,
      newEmail: newEmail,
      password: password
    };
    const response = await fetch(API + "/profile/setEmail", {
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

  // Handlers for browsing and selecting avatars.
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
        <button className="close-btn" onClick={onClose}>❌</button>
        <div className="tab-navigation">
          <button
            className={activeTab === 'username' ? 'active' : ''}
            onClick={() => handleTabClick('username')}
          >
            ✏️Edit Alias
          </button>
          <button
            className={activeTab === 'email' ? 'active' : ''}
            onClick={() => handleTabClick('email')}
          >
            ✏️Edit Email
          </button>
          <button
            className={activeTab === 'avatar' ? 'active' : ''}
            onClick={() => handleTabClick('avatar')}
          >
            🦊Select Avatar
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'username' && (
            <form onSubmit={handleSubmitAlias}>
              <label>New Alias:</label>
              <input type="text" value={newAlias} onChange={(e) => setNewAlias(e.target.value)} />
              <button type="submit">Save</button>
            </form>
          )}
          {activeTab === 'email' && (
              <form onSubmit={handleSubmitEmail}>
                <label>New Email:</label>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                <label>Enter Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
