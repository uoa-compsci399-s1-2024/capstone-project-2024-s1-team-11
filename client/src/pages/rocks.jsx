import Header from '../components/header';
import Footer from '../components/footer';
import React, {useState, useEffect} from 'react';

const RocksPage = () => {
  const [rocks, setRocks] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["topic", "name"]);
  useEffect(() => {
    fetchRocks();
    console.log(rocks);
  }, []);

  const fetchRocks = async () => {
    const fetchPromise = await fetch('http://localhost:5000/rocks');
    const streamPromise = await fetchPromise.json();
    setRocks(streamPromise);
  }

  useEffect(() => {
    if(rocks.length == 0) {
      const randomRocks = [
        {rock_name: "zero", rock_image: "../placeholder.jpg", product_key: 0}, {rock_name: "one", rock_image: "../redSquare.jpg", product_key: 1}
      ]
      setRocks(randomRocks);
      console.log(rocks);
    }
  }, [rocks]);

  function search(rocks) {
    return rocks.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          console.log(newItem)
          
        );
      });
    });
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
              <input type="search" name="search-form" id="search-form" className="search-input" size="10" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)}></input>
              
            </label>
          </div>
            <section id="rocksList">
              {rocks.map((rock) => (
                <img src={rock.rock_image} alt={rock.rock_name} key={rock.product_key} height="120"/>
              ))}
              {search(rocks).map((item) => (
                <img src={item.rock_image} alt={item.rock_name} key={item.product_key} height="120"/>
              ))}

            </section>
          
        </main>
        <Footer />
    </>
  );
}
export default RocksPage;
