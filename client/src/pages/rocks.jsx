import Header from '../components/header';
import Footer from '../components/footer';

export default function RocksPage() {
  return (
    <>
      <Header />
        <main>
          <h1>Rocks</h1>
          <p>Browse rocks, or search for your favourite maths concept.</p>
          <div className="rocks">
            <form>
              <select name="sortBy" id="sortBy">
                <option default value>Sort by:</option>
                <option value="rarity">Rarity of rock</option>
                <option value="mostFound">Most found</option>
                <option value="alphabet">Alphabetical</option>
                <option value="number">Numerical</option>
                </select>
            </form>
            <input type="text" size="20" placeholder="Search ..."></input>
            <section id="rocksList">
              <div>
                <p>rock0</p>
              </div>
              <div>
                <p>rock1</p>
              </div>

            </section>
          </div>
        </main>
        <Footer />
    </>
  );
}
