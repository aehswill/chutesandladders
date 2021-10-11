import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import Play from './Play';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Navbar></Navbar>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path='/play'>
              <Play></Play>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
