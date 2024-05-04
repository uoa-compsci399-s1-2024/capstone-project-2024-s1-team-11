import mathsRocksLogo from '/maths-rocks-logo.svg';
import Header from '../components/header';
import Footer from '../components/footer';
import TopicCards from '../components/topic';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [imageSize, setImageSize] = useState(100)
  const [showHeader, setShowHeader] = useState(false)

  function logit() {
    setScrollY(window.scrollY);
    if (scrollY > 0) {
      setImageSize(100 - scrollY);
    } 
    if (imageSize <= 0) {
      setShowHeader(true);
    }
    if (imageSize > 0) {
      setShowHeader(false);
    }
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  return (
    <>
      <div className={showHeader ? 'home show' : 'home'}>
      <Header />
        <main>
        <section className='section1 side-padding'>
          <div className='main-logo-container'>
            <img src={mathsRocksLogo} alt="Maths Rocks logo" title="Maths Rocks" className="main-logo" style={{width: imageSize + "%"}} />
          </div>
          <Link to={`/rocks`}><button className='floating-btn1'><img src="/rock-icon.svg" alt="An icon of a rock" title="Browse maths topics!" /></button></Link>
          <Link to={`/about`}><button className='floating-btn2'><img src="/about-icon.svg" alt="An icon of an information symbol" title="Learn more about Maths Rocks!" /></button></Link>
          <Link to={`/leaderboard`}><button className='floating-btn3'><img src="/leaderboard-icon.svg" alt="An icon of a leaderboard" title="Check out the leaderboard!" /></button></Link>
          </section>
          <section className='section2 side-padding'>
            <span className='top-curve'>
              <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 146.29 22">
                <path className="curve" d="M0,0v.11c18.96,13.55,44.71,21.89,73.08,21.89S127.31,13.61,146.29,0H0Z"/>
              </svg>
            </span>
            <div className='txt-overlay'>
              <p>What is maths rocks introduction paragraph ed eatur repeliqui vele ctorro ga. Num qui oditatio demquia quo earchite volo.</p>
              <Link to={`/about`}><button className='btn'>LEARN MORE</button></Link >
            </div>
          </section>
          <section className='section3 side-padding top-padding'>
            <h2>Browse maths topics</h2>
            <div className="rock-grid">
              <TopicCards />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
