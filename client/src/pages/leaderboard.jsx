import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/header';
import Footer from '../components/footer';
import '../leaderboard_styles.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Generate random user data if leaderboardData is empty
  useEffect(() => {
    if (leaderboardData.length === 0) {
      const randomUsers = Array.from({ length: 10 }, (_, index) => ({
        user_id: index + 1,
        username: `User ${index + 1}`,
        rock_count: 0
      }));
      setLeaderboardData(randomUsers);
    }
  }, [leaderboardData]);

  return (
    <>
      <Header />
      <main>
        <h1 className="leaderboard-header">Leaderboard</h1>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="left-align">
                <span className="rank-heading">Rank</span>
              </th>
              <th className="left-align">
                <span className="user-heading">User</span>
              </th>
              <th className="left-align">
                <span className="rocks-heading">Rocks</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td className="user-cell">
                  <Link to={`/profile/${user.user_id}`} className="user-link">
                    <img src="/default_avatar.jpg" alt="Avatar" className="avatar"/>
                    <span className="username">{user.username}</span>
                  </Link>
                </td>
                <td style={{ textAlign: 'right' }}>{user.rock_count}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </>
  );
};

export default Leaderboard;
