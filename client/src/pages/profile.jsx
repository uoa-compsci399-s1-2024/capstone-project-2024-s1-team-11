import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../components/header';
import Footer from '../components/footer';
import EditProfileModal from '../components/edit-profile-modal';
import '../profile_styles.css';
import API from '../../api';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user_id = Cookies.get("user_id");
  const username = Cookies.get("username");
  const signature = Cookies.get("signature");
  const [userData, setUserData] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  useEffect(() => {
    if (user_id) {
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
    }
  }, []);

  return (
      <>
        <Header/>
        <main>
          <div className="profile-container">
            <img src="/default_avatar.jpg" alt="Profile Picture" className="profile-picture"/>
            <p className="greeting">{userData ? `Hi, ${userData.username}!` : 'Hi, Username!'}</p>
            <p>{userData ? userData.district : 'Auckland'}</p>
            <div className="buttons-section">
              <button onClick={openEditProfileModal} className="profile-button">Edit profile</button>
            </div>

            {/* Render EditProfileModal */}
            <EditProfileModal isOpen={isEditProfileModalOpen} onClose={closeEditProfileModal}/>
            <p>Total rocks found: {userData ? userData.rock_count : '0'}</p>
          </div>

          <div className="badges-section">
            <h2>Badges</h2>
            <div className="rounded-border1">
              <ul className="list-container">
                {userData && userData.badges && userData.badges.map(badge => (
                    <li key={badge.badge_id} className="badge-square">{badge.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rocks-section">
            <h2>Rocks</h2>
            <div className="rounded-border2">
              <ul className="list-container">
                {userData && userData.rocks && userData.rocks.map(rock => (
                    <li key={rock.rock_id} className="badge-square">{rock.name}</li>
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
        </main>
        <Footer/>
      </>
  );
};

export default ProfilePage;