import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";


export default function RockTopicPage() {
  const { rock_id } = useParams();
  const location = useLocation();
  const [rock, setRock] = useState(null);
  const [topic, setTopic] = useState(null);
  const [isLogged, setIsLogged] = useState(!!Cookies.get('username'));

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

          const topicResponse = await fetch(`http://localhost:5000/topics/${data.topic_id}`);
          if (!topicResponse.ok) {
            throw new Error('Failed to fetch topic information');
          }
          const topicData = await topicResponse.json();
          setTopic(topicData);
        } catch (error) {
          console.error('Error fetching rock information:', error);
        }
      };
      fetchRockInfo();
    }
  }, [rock_id]);

  // Extracting product_key from the URL
  const urlSearchParams = new URLSearchParams(location.search);
  const productKeyFromUrl = urlSearchParams.get('product_key');

  const showCollectButton = rock && productKeyFromUrl === rock.product_key;

  async function handleAddToCollection() {
    try {
      if (!isLogged) {
        return;
      }

      const userResponse = await fetch(`http://localhost:5000/users?username=${encodeURIComponent(username)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      
      const userData = await response.json();
      const user_id = userData.user_id;

      const rockAlreadyInCollection = false;

      if (rockAlreadyInCollection) {
        return;
      }

      const addRockResponse = await fetch('rocks/${rock_id}/add-to-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({user_id: user_id, rock_id}),
      });
      if (addRockResponse.ok) {
        console.log(rock_id, 'has been added to your collection')
      } else {
        console.error('Failed to add rock to collection');
      }
    } catch (error) {
      console.error('Error adding rock to collection');
    }
  }
  return (
    <>
      <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            {rock && rock.rock_name && (
              <>
                {topic && topic.title && topic.description && (
                  <>
                    <h1>{topic.title}</h1>
                    <p>{topic.description}</p>
                  </>
                )}
                {showCollectButton && (
                  <>
                    {isLogged ? (
                      <button className='btn' onClick={handleAddToCollection}>ADD TO COLLECTION +</button>
                    ) : (
                      <Link to={`/rocks`}><button className='btn'>SIGN IN TO COLLECT +</button></Link>
                    )}
                  </>
                )}
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