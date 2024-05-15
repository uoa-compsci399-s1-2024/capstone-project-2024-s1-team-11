import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import API from '../../api';
import '../leaderboard_styles.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [monthly, setMonthly] = useState(false);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        let url = API + `/leaderboard`;
        if (monthly) {
          url += '/monthly';
        }
        const response = await fetch(url);
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
  }, [monthly]);

  return (
    <>
      <Header />
      <main>
        <article className='side-padding top-padding'>
          <h1 className="leaderboard-header">Leaderboard</h1>
          <div className="toggle-buttons">
            <button onClick={() => setMonthly(false)} className={!monthly ? "active" : ""}>All Time</button>
            <button onClick={() => setMonthly(true)} className={monthly ? "active" : ""}>Monthly</button>
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
                    <div className="avatar-wrapper">
                      {user && user.avatar ? (
                        <img src={`/${user.avatar}`} alt="Profile Picture" className="avatar" />
                      ) : (
                        <img src="/avatar-00.jpg" alt="Default Profile Picture" className="avatar" />
                      )}
                    </div>
                    <span className="username">{user.username}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>{user.rock_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Leaderboard;
