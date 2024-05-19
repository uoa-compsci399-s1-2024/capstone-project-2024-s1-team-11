import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../components/header';
import Footer from '../components/footer';
import '../profile_styles.css';
import API from '../../api';
import EditProfileModal from '../components/edit-profile-modal';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user_id = Cookies.get("user_id");
  const username = Cookies.get("username");
  const signature = Cookies.get("signature");
  const [userData, setUserData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {

    if (user_id !== undefined && user_id !== null) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(API + `/profile`,
              {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user_id: user_id, username: username, signature: signature})
              });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    } else{ navigate("/"); }

  }, []);

  const handleEditProfile = () => {
    setShowEditModal(true); 
  };

  useEffect(() => {
    console.log('showEditModal:', showEditModal);
  }, [showEditModal]);

  return (
      <>
        <Header/>
        {userData &&
        <main>
        <article className='side-padding top-padding' id='profile'>

          <div className="profile-container">
            <img src={API + "/images/avatars/" + userData.avatar_imageUri} alt="Profile Picture" className="profile-picture"/>
          
            <p className="greeting">{userData ? `Hi, ${userData.alias}!` : 'Hi, User Alias!'}</p>
            <p>{userData ? userData.district : 'Auckland'}</p>
            <div className="buttons-section">
              <button className="profile-button" onClick={handleEditProfile}>Edit profile</button>
            </div>

            <p>Total rocks found: {userData ? userData.rock_count : '0'}</p>
          </div>

          <div className="badges-section">
            <h2>Badges</h2>
            <div className="rounded-border1">
              <ul className="list-container">
                {userData && userData.badges && userData.badges.map(badge => (
                    <li key={badge.badge_id} className="badge-square">{badge.badge_title}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rocks-section">
            <h2>Rocks</h2>
            <div className="rounded-border2">
              <ul className="list-container">
                {userData && userData.rocks && userData.rocks.map(rock => (
                    <li key={rock.rock_id} className="badge-square">{rock.rock_name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="profile-container">
            <div className="action-buttons">
              <div className="button-container">
                <button onClick={() => navigate('/leaderboard')} className="action-button">View the Leaderboard
                </button>
              </div>
              <div className="button-container">
                <button onClick={() => navigate('/rocks')} className="action-button">View All Rocks</button>
              </div>
              <div className="button-container">
                <button className="action-button">Rock Finding Tips</button>
              </div>
            </div>
          </div>
          </article>
        </main>
        }
        <Footer/>
        {showEditModal && <EditProfileModal onClose={() => setShowEditModal(false)} />}
      </>
  );
};

export default ProfilePage;
