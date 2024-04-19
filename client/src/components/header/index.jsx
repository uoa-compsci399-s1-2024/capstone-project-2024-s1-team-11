import './styles.css'
import mathsRocksLogo from '/maths-rocks-logo.svg';
import { Link, NavLink } from "react-router-dom";
import React, { useState } from 'react';

function Hamburger() {
  return (
    <>
    <div className="bar1">
      <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.02 4.02">
        <path className='hamburger' d="M12,3.48c-2.36,0-5.75-.14-10.6-.48C.57,2.94-.05,2.22,0,1.4.06.57.78-.06,1.6,0c5.6.38,12.24.6,13.74.3.35-.27.81-.38,1.27-.26.8.2,1.29,1.01,1.09,1.82-.22.89-.4,1.61-5.71,1.61ZM14.8,1.14h0Z"/>
      </svg>
    </div>
    <div className="bar2">
      <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.02 4.02">
        <path className="hamburger" d="M16.51,4.02c-.22,0-.44-.05-.65-.15-.07-.03-1.97-.87-6.28-.87-4.7,0-7.82.47-7.85.47C.9,3.6.14,3.03.02,2.21S.45.63,1.27.51c.13-.02,3.35-.51,8.31-.51s7.37,1.06,7.61,1.18c.74.37,1.04,1.27.67,2.01-.26.53-.79.83-1.34.83Z"/>
      </svg>
    </div>
    <div className="bar3">
      <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.02 4.02">
        <path className="hamburger" d="M12.39,3.85c-1.16,0-2.43-.12-3.68-.46-3.2-.88-6.82,0-6.85,0-.8.2-1.62-.29-1.82-1.09C-.16,1.51.33.69,1.13.49c.18-.04,4.41-1.09,8.38,0,3.17.87,6.76-.14,6.79-.15.79-.23,1.63.23,1.86,1.03.23.79-.23,1.62-1.02,1.86-.12.04-2.17.62-4.75.62Z"/>
      </svg>
    </div>
    </>
  )
}

function Navigation() {
  return (
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
  )
}

function LoginBtn() {
  return (
    <div className="login-nav-btn">
      <button>Login <br></br>or Join <span className='triangle'></span></button>
    </div>
  )
}

function Logo() {
  return (
    <div className="logo">
      <Link to={`/`}><img src={mathsRocksLogo} alt="Maths Rocks logo" title="Maths Rocks" /></Link>
    </div>
  )
}

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
          <nav className="nav">
            <div className="nav-icon" onClick={() => {
                setMenuOpen(!menuOpen);
            }}>
            <span className={menuOpen ? 'open' : ''}>
              <Hamburger />
            </span>
            </div>
            <div className={menuOpen ? 'nav-container open' : 'nav-container'}>
              <Navigation />
            </div>
          </nav>
            <Logo />
            <LoginBtn />
        </header>
  );
}