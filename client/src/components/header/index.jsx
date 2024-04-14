import './styles.css'
import mathsRocksLogo from '/maths-rocks-logo.svg';
import { Link, NavLink } from "react-router-dom";
import React, { useState } from 'react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
          <nav className="nav">
            <div className="nav-icon" onClick={() => {
                setMenuOpen(!menuOpen);
            }}>
                <span className={menuOpen ? 'open' : ''}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                </span>
            </div>
              <div className={menuOpen ? 'nav-container open' : 'nav-container'}>
                <ul>
                <li><NavLink to={`/`}>Home</NavLink></li>
                <li><NavLink to={`/about`}>About Maths Rocks</NavLink></li>
                <li><NavLink to={`/rocks`}>Rocks & Maths Topics</NavLink>
                  <ul>
                    <li><NavLink to={`/rocks/0`}>0</NavLink></li>
                    <li>Need to loop through items ....</li>
                  </ul>
                </li>
                <li><NavLink to={`/leaderboard`}>Leaderboard</NavLink></li>
                <li><NavLink to={`/profile`}>My Profile</NavLink></li>
                <li><NavLink to={`/contact`}>Contact Us</NavLink></li>
                <li><NavLink to={`/privacy-policy`}>Privacy Policy</NavLink></li>
              </ul>
              </div>
          </nav>
          <div className="logo">
            <Link to={`/`}><img src={mathsRocksLogo} alt="Maths Rocks logo" title="Maths Rocks" /></Link>
          </div>
          <div className="login-nav-btn">
            <button>Login <br></br>or Join <span className='triangle'></span></button>
          </div>
        </header>
  );
}