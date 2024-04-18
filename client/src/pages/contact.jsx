import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';

export default function ContactPage() {
  return (
    <>
      <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            <h1>Contact us</h1>
            <p>Please fill out the form to contact us.</p>
            <p>Mark please insert the contact for here ...</p>
          </article>
        </main>
        <Footer />
    </>
  );
}
