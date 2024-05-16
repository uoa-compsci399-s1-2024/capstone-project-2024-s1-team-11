import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import API from '../../api.js'


export default function TopicPage() {
  const { topic_id } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    if (topic_id) {
      const fetchTopicInfo = async () => {
        try {
          const response = await fetch(API + `/topics/${topic_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch topic information');
          }
          const data = await response.json();
          setTopic(data);

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
      fetchTopicInfo();
    }
  }, [topic_id]);
 
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
            {topic && topic.title && (
              <>
                {topic && topic.title && (
                  <>
                    <h1>{topic.title}</h1>
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