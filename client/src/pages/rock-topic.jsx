import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";


export default function RockTopicPage() {
  const { rock_id } = useParams();
  const [rock, setRock] = useState(null);
  console.log(rock_id);

  useEffect(() => {
    if (rock_id) {
      const fetchRockInfo = async () => {
        try {
          const response = await fetch(`http://localhost:5000/rocks/${rock_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch rock information');
          }
          const data = await response.json();
          setRock(data);
        } catch (error) {
          console.error('Error fetching rock information:', error);
        }
      };
      fetchRockInfo();
    }
  }, [rock_id]);
  return (
    <>
      <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            {!rock || !rock.rock_name ? null : (
              <>
                <h1>{rock.rock_name}</h1>
                <p>{rock.product_key}</p>
                {/* Render topic information if available */}
                {rock.topic && (
                  <p>Topic: {rock.topic.title}</p>
                )}
                <Link to={`/rocks`}><button className='btn'>SIGN IN TO COLLECT +</button></Link>
              </>
            )}
            <h2>Rock hunting tips</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus at quis, esse, similique voluptatem aperiam facilis, corrupti numquam aspernatur nostrum iste dicta quod explicabo possimus? Nulla, molestiae quidem. Assumenda porro similique, odio quis impedit provident totam mollitia repellendus officiis voluptas ipsum nobis reprehenderit nisi odit quisquam voluptatum perspiciatis. Harum, beatae.</p>
            <Link to={`/rocks`}><button className='btn'>LEARN COOL MATHS CONCEPTS!</button></Link >
            <Link to={`/about`}><button className='btn'>ROCK FINDING TIPS</button></Link >

          </article>
        </main>
        <Footer />
    </>
  );
}