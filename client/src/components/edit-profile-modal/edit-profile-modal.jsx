import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import API from '../../../api';
import './styles.css';


const EditProfileModal = ({ onClose }) => {
  // Accessing user credentials stored in cookies.
  const user_id = Cookies.get("user_id");
  const username = Cookies.get("username");
  const signature = Cookies.get("signature");

  // States for setting alias
  const [newAlias, setNewAlias] = useState('');


  // States for setting user avatar.
  const [avatarsList, setAvatarsList] = useState([]);
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Edit-Profile-Modal state.
  const [activeTab, setActiveTab] = useState('');

  // Error message from server's response.
  const [errorMessage, setErrorMessage] = useState({type: '', message: ''});

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
    }else{
      setErrorMessage({
        type: 'alias',
        message: (await response.json()).error
      });
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
    }else {
      setErrorMessage({
        type: 'avatar',
        message: (await response.json()).error
      });
    }
  }

  return (
    <section className='profile-modal-overlay'>
      <section className='profile-modal'>          
        <h1>Edit Profile</h1>
        <button className="close-btn" onClick={onClose}>❌</button>
        <div className="tab-navigation">
          <button
              className={activeTab === 'alias' ? 'active' : ''}
              onClick={() => handleTabClick('alias')}
          >
            ✏️Edit Alias
          </button>
          <button
              className={activeTab === 'avatar' ? 'active' : ''}
              onClick={() => handleTabClick('avatar')}
          >
            🦊Select Avatar
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'alias' && (
              <form onSubmit={handleSubmitAlias}>
                <label>New Alias:</label>
                <input type="text" value={newAlias} onChange={(e) => setNewAlias(e.target.value)} />
                <button type="submit">Save</button>
                {errorMessage.type==='alias' && <p><span style={{color: "red"}}>{errorMessage.message}</span></p>}
            </form>
          )}
          {activeTab === 'avatar' && (
              <div className="avatar-selection">
                <button onClick={handlePrevAvatar}>Previous</button>
                <img src={API + `/images/avatars/${avatarsList[avatarIndex].imageUri}`} alt="Avatar"
                     className="avatar-image"/>
                <button onClick={handleNextAvatar}>Next</button> <br></br>
                <button onClick={handleSelectAvatar}>Set as avatar</button>
                {errorMessage.type==='avatar' && <p><span style={{color: "red"}}>{errorMessage.message}</span></p>}
              </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default EditProfileModal;
