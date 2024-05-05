import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../leaderboard_styles.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isMonthly, setIsMonthly] = useState(false);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const endpoint = isMonthly ? 'http://localhost:5000/monthly-leaderboard' : 'http://localhost:5000/leaderboard';
        const response = await fetch(endpoint);
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
  }, [isMonthly]);

  
  // Function to handle toggle between monthly and all-time leaderboard
  const toggleLeaderboard = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <>
      <Header />
      <main>
        <h1 className="leaderboard-header">Leaderboard</h1>
        <div className="toggle-container">
          <label>
            <input type="checkbox" checked={isMonthly} onChange={toggleLeaderboard} />
            <span className="toggle-text">Monthly</span>
          </label>
        </div>
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
  <div className="user-link">
    <img src="/default_avatar.jpg" alt="Avatar" className="avatar"/>
    <span className="username">{user.username}</span>
  </div>
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
