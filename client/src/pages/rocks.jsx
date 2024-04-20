import Header from '../components/header';
import Footer from '../components/footer';

export default function RocksPage() {
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
              <div className="square"></div>
              <div className="square"></div>
              <div className="square"></div>
              <div className="square"></div>

            </section>
          
        </main>
        <Footer />
    </>
  );
}
