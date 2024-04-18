import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';


export default function PrivacyPage() {
  return (
    <>
      <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            <h1>Privacy policy</h1>
            <p>Insert text .....</p>
          </article>
        </main>
        <Footer />
    </>
  );
}
