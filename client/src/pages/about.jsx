import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';

export default function AboutPage() {
  return (
    <>
      <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            <h1>About Maths Rocks</h1>
            <p>Insert text .....</p>
          </article>
        </main>
        <Footer />
    </>
  );
}
