import Header from '../components/header';
import Footer from '../components/footer';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import API from '../../api.js'

//fetches the data
const RocksPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
        const fetchPromise = await fetch(API + '/topics');
        const streamPromise = await fetchPromise.json();
        const data = Object.entries(streamPromise);
        let output = data.map((obj, i) => ({...obj[1], indexID: i}));
        setTopics(output);
    };
    fetchTopics();

  }, []);

  
  //placeholder data
  useEffect(() => {
    if(topics.length === 0) {
      const randomTopics = [
        {title: "Zero", imageUri: API + "/images/rocks/" + "maths-rocks-zero.jpg", topic_id: 0},
        {title: "One", imageUri: API + "/images/rocks/" + "maths-rocks-one.jpg", topic_id: 1},
        {title: "Two", imageUri: API + "/images/rocks/" + "maths-rocks-two.jpg", topic_id: 2}
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
      if (sortProperty === 'topic_id') {
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
            <h1>Maths topics</h1>
            <p>Browse rocks, or search for your favourite maths concept.</p>
          <div className="rocks">
            <form className="dropDownMenu">
              <select name="sortBy" id="sortBy" onChange={(e) => setSortType(e.target.value)}>
                <option default value>Sort by:</option>
                <option value="alphabet">Alphabetical</option>
                <option value="number">Numerical</option>
                </select>
            </form>
            <label htmlFor="search-form" className='searchBar'>
              <input type="search" name="search-form" id="search-form" className="search-input" size="10" onChange={(e) => setQuery(e.target.value)} placeholder="Search..." ></input>      
            </label>
          </div>
            <section>
            <div className="rock-grid">
            {search(topics).map((topic) => (
                  <Link to={'/topic/' + topic.topic_id} className="rock-grid-item" key={topic.topic_id}>
                    <div className='rock-grid-img' style={{backgroundImage: `url(${API + "/images/rocks/" + topic.imageUri})`}}></div>
                    <h3>{topic.title}</h3>
                    <button className='btn'>Learn More</button>
                  </Link >
              ))}
              </div>
            </section>
          </article>
        </main>
        <Footer />
    </>
  );
}
export default RocksPage;
