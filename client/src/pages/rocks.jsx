import Header from '../components/header';
import Footer from '../components/footer';
import React, {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';

//fetches the data
const RocksPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
        const fetchPromise = await fetch('http://localhost:5000/topics');
        const streamPromise = await fetchPromise.json();
        const data = Object.entries(streamPromise);
        let output = data.map((obj, i) => ({...obj[1], indexID: i}));
        setTopics(output);
    };
    fetchTopics();

  }, []);

  
  //placeholder data
  useEffect(() => {
    if(topics.length == 0) {
      const randomTopics = [
        {title: "zero", imageUri: "../maths-rocks-zero.jpg", topic_id: 0}, {title: "one", imageUri: "../maths-rocks-one.jpg", topic_id: 1},
        {title: "two", imageUri: "../maths-rocks-two.jpg", topic_id: 2}
      ]
     setTopics(randomTopics);
    }
  }, [topics]);

  //search bar function
  const [query, setQuery] = useState("");

  function search(topics) {
    return topics.filter((data) => data.title.includes(query)
    );
  }

  //dropdown sort function - can sort alphabetically and numerically
  const [sortType, setSortType] = useState('numerical');

  useEffect(() => {
    const sortArray = type => {
      const types = {
        alphabet: 'title',
        number: 'topic_id',
      };
      const sortProperty = types[type];
      let sorted = '';
      if (sortProperty == 'topic_id') {
        sorted = [...topics].sort((a, b) => a[sortProperty] - b[sortProperty]);
      } else {
        sorted = [...topics].sort((a, b) => a.title.localeCompare(b.title));
      }
      setTopics(sorted);
    };
    sortArray(sortType);
  }, [sortType]);


  return (
    <>
      <Header />
        <main>
        <article className='side-padding top-padding'>
          <div className="pageText">
            <h1>Rocks</h1>
            <p>Browse rocks, or search for your favourite maths concept.</p>
          </div>
          <div className="rocks">
            <form className="dropDownMenu">
              <select name="sortBy" id="sortBy" onChange={(e) => setSortType(e.target.value)}>
                <option default value>Sort by:</option>
                <option value="alphabet">Alphabetical</option>
                <option value="number">Numerical</option>
                </select>
            </form>
            <label htmlFor="search-form">
              <input type="search" name="search-form" id="search-form" className="search-input" size="10" onChange={(e) => setQuery(e.target.value)} placeholder="Search..." ></input>
              
            </label>
          </div>
            <section id="rocksList">
            {search(topics).map((topic) => (
                <div>
                  <img src={topic.imageUri} alt={topic.title} key={topic.topic_id} height="120"/>
                  <h3>{topic.title}</h3>
                  <Link to={'/rocks/' + topic.topic_id}>
                    <button className='btn'>Learn More</button>
                  </Link>
                </div>
              ))}


            </section>
          </article>
        </main>
        <Footer />
    </>
  );
}
export default RocksPage;
