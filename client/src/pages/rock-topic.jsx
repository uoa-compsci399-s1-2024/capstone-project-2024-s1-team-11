import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import API from '../../api.js'


export default function RockTopicPage() {
  const { rock_id } = useParams();
  const location = useLocation();
  const [rock, setRock] = useState(null);
  const [topic, setTopic] = useState(null);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(!!Cookies.get('username'));
  const [rockCollected, setCollected] = useState(false);

  useEffect(() => {
    if (rock_id) {
      const fetchRockInfo = async () => {
        try {
          const response = await fetch(API + `/rocks/${rock_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch rock information');
          }
          const data = await response.json();
          setRock(data);

          const topicResponse = await fetch(API + `/topics/${data.topic_id}`);
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
    fetchCollectionInfo();
  }, [rock_id]);

  const fetchCollectionInfo = async () => {
    try {
      const username = Cookies.get('username');
      const userResponse = await fetch(API + `/user/${username}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user information');
      }
      const userData = await userResponse.json();
      setUser(userData);
      console.log(userData.user_id);

      let res = await fetch(
        API + `/checkCollection`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ user_id: userData.user_id, rock_id: rock_id })
        });
      if (res.status === 200) {
        setCollected(false);
        console.log("rock not in collection");
      } else if (res.status === 201) {
        setCollected(true);
        console.log("rock already in your collection");
      }
    } catch (error) {
      console.error('Error fetching collection information:', error);
    }
  };

  // Extracting product_key from the URL
  const urlSearchParams = new URLSearchParams(location.search);
  const productKeyFromUrl = urlSearchParams.get('product_key');

  const showCollectButton = rock && productKeyFromUrl === rock.product_key;

  async function handleAddToCollection() {
    let res = await fetch(
      API + `/addRock`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user_id: user.user_id, rock_id: rock.rock_id })
      });
    if (res.status === 200){
      console.log("rock added to user collection");
      alert("Rock added to your collection!");

      await fetch(
        API + `/giveBadge`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ user_id: user.user_id })
        });
    }
  }
  return (
    <>
      <Header />
        <main>

        {topic && topic.title && (
              <>
                {topic && topic.title && (
                  <>
                    <TopImage imgUri={topic.imageUri} />
                  </>
                )}
              </>
            )}

          <article className='side-padding'>
            {rock && rock.rock_name && (
              <>
                {topic && topic.title && (
                  <>
                    <h1>{topic.title}</h1>
                  </>
                )}
                {showCollectButton && rock && (
                  <>
                    {isLogged ? (
                      <>
                        {rockCollected ? (
                          <button className='btn'>ROCK ALREADY IN COLLECTION</button>
                        ) : (
                          <button className='btn' onClick={handleAddToCollection}>ADD TO COLLECTION +</button>
                        )}
                      </>
                    ) : (
                      <Link to={`/rocks`}><button className='btn'>SIGN IN TO COLLECT +</button></Link>
                    )}
                  </>
                )}
                {topic && topic.description && (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: topic.description }} />
                  </>
                )}
              </>
            )}
            <Link to={`/rocks`}><button className='btn'>LEARN COOL MATHS CONCEPTS!</button></Link >
            <Link to={`/about`}><button className='btn'>ROCK FINDING TIPS</button></Link >

          </article>
        </main>
        <Footer />
    </>
  );
}