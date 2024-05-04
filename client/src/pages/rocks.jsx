import Header from '../components/header';
import Footer from '../components/footer';
import React, {useState, useEffect} from 'react';
//page is currently only fully functional with placeholder data

const RocksPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => { //doesn't work yet as the fetched data is arriving as objects, not an array so map function does not work
    const fetchTopics = async () => {
        const fetchPromise = await fetch('http://localhost:5000/topics');
        const streamPromise = await fetchPromise.json();
        const data = Object.entries(streamPromise); //temporary fix to prevent errors
        setTopics(data);
    };
    fetchTopics();

  }, []);

  
  //placeholder data
  useEffect(() => {
    if(topics.length == 0) { //change the 0 to however many topic objects in the database to use placeholder data
      const randomTopics = [
        {title: "zero", imageUri: "../placeholder.jpg", topic_id: 0}, {title: "one", imageUri: "../placeholder.jpg", topic_id: 1},
        {title: "two", imageUri: "../placeholder.jpg", topic_id: 2}
      ]
     setTopics(randomTopics);
    }
  }, [topics]);

  //console.log(topics);

  //search bar function
  const [query, setQuery] = useState("");
  const search_params = Object.keys(Object.assign({}, ...topics));

  function search(topics) {
    return topics.filter((data) => 
    search_params.some((param) =>
    data[param].toString().toLowerCase().includes(query)
      )
    );
  }

  //dropdown sort function - can sort alphabetically and numerically
  const [sortType, setSortType] = useState('numerical');

  useEffect(() => {
    const sortArray = type => {
      const types = {
        rarity: 'rarity',
        mostFound: 'found',
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
          <div className="pageText">
            <h1>Rocks</h1>
            <p>Browse rocks, or search for your favourite maths concept.</p>
          </div>
          <div className="rocks">
            <form className="dropDownMenu">
              <select name="sortBy" id="sortBy" onChange={(e) => setSortType(e.target.value)}>
                <option default value>Sort by:</option>
                <option value="rarity">Rarity of rock</option>
                <option value="mostFound">Most found</option>
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
                <img src={topic.imageUri} alt={topic.title} key={topic.topic_id} height="120" title={topic.title}/>
              ))}


            </section>
          
        </main>
        <Footer />
    </>
  );
}
export default RocksPage;
