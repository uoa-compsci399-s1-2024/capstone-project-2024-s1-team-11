import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import Header from '../components/header';
import Footer from '../components/footer';
import EditProfileModal from '../components/edit-profile-modal';
import Modal from '../components/modal';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user_id } = useParams(); 
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
          const response = await fetch(`http://localhost:5000/profile/${user_id}`);
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
    } else {
      // Set default user data for display purposes - DELETE later
      setUserData({
        username: 'Billy',
        district: 'Auckland',
        rock_count: 2,
        badges: [
          { name: 'Badge 1' },
          { name: 'Badge 2' },
        ],
        rocks: [
          { name: 'Rock 1' },
          { name: 'Rock 2' },
          
        ]

        
      });
    }
  }, [user_id]);

  return (
    <>
      <Header />
      <main>
      <article className='side-padding'>
        <div className="profile-container">
          <img src="/default_avatar.jpg" alt="Profile Picture" className="profile-picture" />
          <h1 className="greeting">{userData ? `Hi, ${userData.username}!` : 'Hi, Username!'}</h1>
          <p>{userData ? userData.district : 'Auckland'}</p>
          <div className="buttons-section">
            <button onClick={openEditProfileModal} className="profile-button">Edit profile</button>
          </div>

        {/* Render EditProfileModal */}
        <EditProfileModal isOpen={isEditProfileModalOpen} onClose={closeEditProfileModal} />
          <div className='profile-card'>
            <div>Total rocks found:</div><div> {userData ? userData.rock_count : '0'}</div>
          </div>
        </div>
        
          <h2>Badges</h2>
          <div className="badges-section">
              {userData && userData.badges && userData.badges.map(badge => (
                <div key={badge.badge_id} className="badge-square">{badge.name}</div>
              ))}
          </div>

        <div className="rocks-section">
          <h2>Rocks collected</h2>
          <div className="badges-section">
              {userData && userData.rocks && userData.rocks.map(rock => (
                <li key={rock.rock_id} className="badge-square">{rock.name}</li>
              ))}
          </div>
        </div>
        
        <div className="profile-container">
          <div className="action-buttons">
            <div className="button-container">
              <button onClick={() => navigate('/leaderboard')} className="btn">View the Leaderboard</button>
            </div>
            <div className="button-container">
              <button onClick={() => navigate('/rocks')} className="btn blue">View All Rocks</button>
            </div>
            <div className="button-container">
              <button className="btn yellow">Rock Finding Tips</button>
            </div>
          </div>
        </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
