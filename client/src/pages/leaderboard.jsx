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

  // Generate random user data for display purposes
  useEffect(() => {
    if (leaderboardData.length === 0) {
      const randomUsers = [
        { user_id: 1, username: "User 1", rock_count: 10 },
        { user_id: 2, username: "User 2", rock_count: 9 },
        { user_id: 3, username: "User 3", rock_count: 9 },
        { user_id: 4, username: "User 4", rock_count: 7 },
        { user_id: 5, username: "User 5", rock_count: 6 },
        { user_id: 6, username: "User 6", rock_count: 5 },
        { user_id: 7, username: "User 7", rock_count: 4 },
        { user_id: 8, username: "User 8", rock_count: 3 },
        { user_id: 9, username: "User 9", rock_count: 1 },
        { user_id: 10, username: "User 10", rock_count: 0 }
      ];
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
                <td>
                  {index > 0 && user.rock_count === leaderboardData[index - 1].rock_count
                    ? `#${index}`
                    : `#${index + 1}`}
                </td>
                <td className="user-cell">
                    <img src="/default_avatar.jpg" alt="Avatar" className="avatar"/>
                    <span className="username">{user.username}</span>
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
