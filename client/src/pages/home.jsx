import mathsRocksLogo from '/maths-rocks-logo.svg';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from "react-router-dom";


export default function HomePage() {
  return (
    <>
      <div className="home">
      <Header />
        <main>
        <section className='section1 side-padding'>
          <img src={mathsRocksLogo} alt="Maths Rocks logo" title="Maths Rocks" className='main-logo' />
          <Link to={`/rocks`}><button className='floating-btn1'>Rocks</button></Link>
          <Link to={`/about`}><button className='floating-btn2'>About</button></Link>
          <Link to={`/leaderboard`}><button className='floating-btn3'>Leaderboard</button></Link>
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
          <section className='section3'>
            <p>Swipe through rocks still to be completed</p>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
