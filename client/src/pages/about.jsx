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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus at quis, esse, similique voluptatem aperiam facilis, corrupti numquam aspernatur nostrum iste dicta quod explicabo possimus? Nulla, molestiae quidem. Assumenda porro similique, odio quis impedit provident totam mollitia repellendus officiis voluptas ipsum nobis reprehenderit nisi odit quisquam voluptatum perspiciatis. Harum, beatae.</p>
            <h2>Rock hunting tips</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus at quis, esse, similique voluptatem aperiam facilis, corrupti numquam aspernatur nostrum iste dicta quod explicabo possimus? Nulla, molestiae quidem. Assumenda porro similique, odio quis impedit provident totam mollitia repellendus officiis voluptas ipsum nobis reprehenderit nisi odit quisquam voluptatum perspiciatis. Harum, beatae.</p>
            <Link to={`/rocks`}><button className='btn'>LEARN COOL MATHS CONCEPTS!</button></Link >
          </article>
        </main>
        <Footer />
    </>
  );
}
