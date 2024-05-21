import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';
import { Link } from "react-router-dom";


export default function AboutPage() {
  return (
    <>
      <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            <h1>About Maths Rocks</h1>
            <p>Maths Rocks is the brainchild of Dr Nicolette Rattenbury from the University of Auckland. The goal of this website is to provide Kiwi’s with an engaging educational web application that works in tandem with the real-world hobby of searching for painted rocks, making positive associations between maths, treasure hunting, fun and discovery.</p>
            <p>Maths can seem scary to some people, but we think maths is awesome. Maths Rocks is all about sharing knowledge, getting outdoors and searching for rocks, and above all else, encouraging a love of maths. </p>
            <h2>How it works</h2>
            <p>There’s this cool craze that's taken off in New Zealand where people paint rocks and hide them for children to find. We have painted heaps of rocks with mathematical concepts on them and hidden them around the Auckland region. All you have to do is find a rock, scan the QR code, register an account and add the rock to your collection! </p>
            <h2>How to earn badges</h2>
            <p>You will automatically be awarded badges when you reach rock collecting milestones. The first badge is awarded when you collect your first rock, and then badges will be given for reaching 5, 10 and 20 rocks.</p>
            <h2>Rock hunting tips</h2>
            <p>We have hidden rocks around Auckland.</p>
            <p>Share your finds with your friends, get together a group of friends and go rock hunting, and remember to hide the rocks again for someone else to find.</p>
            <p>Happy rock hunting everyone!</p>
            <Link to={`/topics`}><button className='btn'>LEARN COOL MATHS CONCEPTS!</button></Link >
          </article>
        </main>
        <Footer />
    </>
  );
}