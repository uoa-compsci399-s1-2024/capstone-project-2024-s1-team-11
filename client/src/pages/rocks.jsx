import Header from '../components/header';
import Footer from '../components/footer';

export default function RocksPage() {
  return (
    <>
      <Header />
        <main>
        <article className='side-padding  top-padding'>
          <h1>Maths topics</h1>
          <p>Browse topics, or search for your favourite maths concept.</p>
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
              <div className="square">
                <img src="../placeholder.jpg" alt="Image overlay" />
              </div>
              <div className="square">
                <img src="../placeholder.jpg" alt="Image overlay" />
              </div>
              <div className="square">
                <img src="../placeholder.jpg" alt="Image overlay" />
              </div>
              <div className="square">
                <img src="../placeholder.jpg" alt="Image overlay" />
              </div>
              <div className="square">
                <img src="../placeholder.jpg" alt="Image overlay" />
              </div>
              <div className="square">
                <img src="../placeholder.jpg" alt="Image overlay" />
              </div>
            </section>
          </article>
        </main>
        <Footer />
    </>
  );
}