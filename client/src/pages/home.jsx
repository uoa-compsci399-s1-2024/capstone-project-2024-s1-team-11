import mathsRocksLogo from '/maths-rocks-logo.svg';
import Header from '../components/header';
import Footer from '../components/footer';

export default function HomePage() {
  return (
    <>
      <div className="home">
      <Header />
        <main>
        <section className='section1 side-padding'>
          <img src={mathsRocksLogo} alt="Maths Rocks logo" title="Maths Rocks" className='main-logo' />
          <button className='floating-btn1'>Rocks</button>
          <button className='floating-btn2'>About</button>
          <button className='floating-btn3'>Leaderboard</button>
          </section>
          <section className='section2 side-padding'>
            <span className='top-curve'></span>
            <div className='txt-overlay'>
              <p>What is maths rocks introduction paragraph ed eatur repeliqui vele ctorro ga. Num qui oditatio demquia quo earchite volo.</p>
              <button className='btn'>LEARN MORE</button>
            </div>
          </section>
          <section className='section3'>
            <p>Swipe through rocks</p>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
