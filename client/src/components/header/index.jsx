import './styles.css'
import mathsRocksLogo from '/maths-rocks-logo.svg';
import Hamburger from '../Hamburger';
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from '../modal';
import Cookies from "js-cookie";
import authorization from "../../utils/auth.jsx";

function Navigation() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const user_id = Cookies.get("user_id");
    const username = Cookies.get("username");
    const signature = Cookies.get("signature");

    useEffect(() => {
        const authorize = async () => {
            if (await authorization(user_id, username, signature)){
                setIsAuthorized(true);
            }
        }
        authorize();
    }, []);

  return (
    <>
    <ul>
        <li><NavLink to={`/`}>Home</NavLink></li>
        <li><NavLink to={`/about`}>About Maths Rocks</NavLink></li>
        <li><NavLink to={`/topics`}>Maths Topics</NavLink></li>
        <li><NavLink to={`/leaderboard`}>Leaderboard</NavLink></li>
        <li><NavLink to={`/contact`}>Contact Us</NavLink></li>
        <li><NavLink to={`/privacy-policy`}>Privacy Policy</NavLink></li>
        <li><NavLink to={`/profile`}>My Profile</NavLink></li>
        {isAuthorized && <li><NavLink to={`/cms`}>Content Management</NavLink></li>}
    </ul>
    </>
  )
}

function LoginBtn() {
  const [modalOpen, setModalOpen] = useState(false);
  const [displayLoginForm, setDisplayLoginForm] = useState(true);
  const [isLogged, setIsLogged] = useState(!Cookies.get('username') === undefined);
  const navigate = useNavigate();

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
  }, []);

  return (
    <>
      <div className="login-nav-btn">
        {Cookies.get('username') === undefined && isLogged === false &&
        <button onClick={() => { setModalOpen(!modalOpen); }}>
            🔑Log In /<br></br>/📜Sign Up <span className='triangle'></span>
        </button>}
        {Cookies.get('username') !== undefined && isLogged === true &&
        <button onClick={() => { 
          Cookies.remove('username');
          Cookies.remove('user_id');
          Cookies.remove('signature');
          setIsLogged(false);
          navigate("/");

          }}>
            ↪️Log out <span className='triangle'></span>
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