import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';


export default function RockTopicPage() {
  return (
    <>
      <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            <h1>What’s interesting about the number 0?</h1>
            <p>Insert text .....</p>
          </article>
        </main>
        <Footer />
    </>
  );
}
