import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from "./Navbar.js"
import Home from "./Home.js"
import Maths from "./Maths.js"
import "./styling/App.css"

function App() {
  return (
    <Router>
      <Navbar/>
      <div id="main">
        <Switch>
          <Route exact path="/">
              <Home/>
          </Route>
          <Route exact path="/maths/:id">
              <Maths/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
