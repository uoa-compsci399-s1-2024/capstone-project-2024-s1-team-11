import './styles.css'
import mathsRocksLogo from '/maths-rocks-logo.svg';
import Hamburger from '../Hamburger';
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import Modal from '../modal';
import Cookies from "js-cookie";

function Navigation() {
  return (
    <>
    <ul>
        <li><NavLink to={`/`}>Home</NavLink></li>
        <li><NavLink to={`/about`}>About Maths Rocks</NavLink></li>
        <li><NavLink to={`/rocks`}>Maths Topics</NavLink></li>
        <li><NavLink to={`/leaderboard`}>Leaderboard</NavLink></li>
        <li><NavLink to={`/contact`}>Contact Us</NavLink></li>
        <li><NavLink to={`/privacy-policy`}>Privacy Policy</NavLink></li>
        <li><NavLink to={`/profile`}>My Profile</NavLink></li>
    </ul>
    </>
  )
}

function LoginBtn() {
  const [modalOpen, setModalOpen] = useState(false);
  const [displayLoginForm, setDisplayLoginForm] = useState(true);
  const [isLogged, setIsLogged] = useState(!Cookies.get('username') === undefined);

  function handleState() {
    setModalOpen(!modalOpen);
    setDisplayLoginForm(true);
  }

  function handleFormState() {
    setDisplayLoginForm(!displayLoginForm);
  }

  useEffect(() => {
    if (Cookies.get('username') !== undefined){
      setIsLogged(true);
    }else{
      setIsLogged(false);
    }
  }); 

  return (
    <>
      <div className="login-nav-btn">
        {!Cookies.get('username') && isLogged === false &&
        <button onClick={() => { setModalOpen(!modalOpen); }}>
          Login <br></br>or Join <span className='triangle'></span>
        </button>}
        {Cookies.get('username') && isLogged === true &&
        <button onClick={() => { 
          Cookies.remove('username');
          Cookies.remove('user_id');
          Cookies.remove('signature');
          setIsLogged(false);
          }}>
          Logout <span className='triangle'></span>
        </button>}
        <div className={modalOpen ? 'open-modal' : ''}>
          <Modal close={handleState} formFunction={handleFormState} formState={displayLoginForm} />
        </div>
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