import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../leaderboard_styles.css';
import API from '../../api.js'

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [avatarsMap, setAvatarsMap] = useState(new Map);
  const [monthly, setMonthly] = useState(false);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        let url = API + '/leaderboard';
        if (monthly) {
          url += '/monthly';
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const top20Users = await response.json();

        // Rank the top 20 users.
        let rank = 1;
        for (let i = 0; i < top20Users.length; i++){
          if (i === 0){
            top20Users[i].rank = rank;
          }
          else if(Number.parseInt(top20Users[i].rock_count) === Number.parseInt(top20Users[i - 1].rock_count)){
            top20Users[i].rank = rank;
          } else{
            rank = rank + 1;
            top20Users[i].rank = rank;
          }
        }
        setLeaderboardData(top20Users);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };
    const fetchAvatars = async () => {
      try {
        const response = await fetch(API + "/avatars");
        const avatars = await response.json();
        const avatarsMap = new Map();
        avatars.map((avatar) => {
          avatarsMap.set(avatar.avatar_id, avatar.imageUri);
        });
        setAvatarsMap(avatarsMap);
      }catch (e) {
        console.error(`Error fetching avatars data: ${e}`);
      }
    }
    fetchLeaderboardData();
    fetchAvatars();
  }, [monthly]);

  return (
    <>
      <Header />
      <main>
      <article className='side-padding top-padding'>
        <h1 className="leaderboard-header">👑Leaderboard</h1>
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
                  {`🏅${leaderboardData[index].rank}`}
                </td>
                <td className="user-cell">
                  <img
                      src={user.avatar_id !== null ?
                        API + `/images/avatars/${avatarsMap.get(user.avatar_id)}` :
                        API + `/images/avatars/default_avatar.jpg`}
                       alt="Avatar" className="avatar"/>
                  <span className="username">{user.alias}</span>
                </td>
                <td style={{textAlign: 'center' }}>💎{user.rock_count}</td>
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
