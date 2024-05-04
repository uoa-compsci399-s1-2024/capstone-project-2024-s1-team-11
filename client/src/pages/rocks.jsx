import Header from '../components/header';
import Footer from '../components/footer';
import React, {useState, useEffect} from 'react';

const RocksPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
        const fetchPromise = await fetch('http://localhost:5000/topics');
        const streamPromise = await response.json();
        setTopics(data);
    };
    //fetchTopics();

  }, []);

  

  useEffect(() => {
    if(topics.length == 0) {
      const randomTopics = [
        {title: "zero", imageUri: "../placeholder.jpg", topic_id: 0}, {title: "one", imageUri: "../default_avatar.jpg", topic_id: 1},
        {title: "two", imageUri: "none", topic_id: 2}
      ]
     setTopics(randomTopics);
    }
  }, [topics]);

  console.log(topics);
  const [query, setQuery] = useState("");
  const search_params = Object.keys(Object.assign({}, ...topics));

  function search(topics) {
    return topics.filter((data) => 
    search_params.some((param) =>
    data[param].toString().toLowerCase().includes(query)
      )
    );
  }
  


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
              <select name="sortBy" id="sortBy">
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
