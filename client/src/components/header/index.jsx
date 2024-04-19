import './styles.css'
import mathsRocksLogo from '/maths-rocks-logo.svg';
import Hamburger from '../Hamburger';
import { Link, NavLink } from "react-router-dom";
import React, { useState } from 'react';
import Modal from '../modal';

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
  const [modalOpen, setModalOpen] = useState(false)
  function handleState() {
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <div className="login-nav-btn">
        <button onClick={() => { setModalOpen(!modalOpen); }}>
          Login <br></br>or Join <span className='triangle'></span>
        </button>
      </div>
      <div className={modalOpen ? 'open-modal' : ''}>
        <Modal close = {handleState} />
      </div>
    </>
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
              <div className='nav-content'>
                <Navigation />
              </div>
            </div>
          </nav>
            <Logo />
            <LoginBtn />
        </header>
  );
}