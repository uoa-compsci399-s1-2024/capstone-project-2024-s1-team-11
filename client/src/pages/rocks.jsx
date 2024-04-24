import Header from '../components/header';
import Footer from '../components/footer';
import React, {useState, useEffect} from 'react';

const RocksPage = () => {
  const [rocks, setRocks] = useState([]);
  useEffect(() => {
    fetchRocks();
  }, []);

  const fetchRocks = async () => {
    const fetchPromise = await fetch('http://localhost:5000/rocks');
    fetchPromise = await fetchPromise.json();
    setRocks(fetchPromise);
  }

  useEffect(() => {
    if(rocks.length == 0) {
      const randomRocks = [
        {rock_name: 0, rock_image: "none", product_key: 0}, {rock_name: 1, rock_image: "none", product_key: 1}
      ]
      setRocks(randomRocks);
    }
  }, [rocks]);


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
            <form className="searchBar">
              <input type="text" size="10" placeholder="Search ..."></input>
            </form>
          </div>
            <section id="rocksList">
              <div className="square"></div> {/* image placeholder */}
              <div className="square"></div>
              {rocks.map((rock) => (
                <img src={rock.rock_image} alt={rock.rock_name} key={rock.product_key} height="130" width="130"/>
              ))}

            </section>
          
        </main>
        <Footer />
    </>
  );
}
export default RocksPage;
