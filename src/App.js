import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Content from './Components/Content';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header/>

      <Routes>
          <Route exact path="/" element={<Content/>}/>
        </Routes>
      
      <Footer/>
    </Router>
  );
}

export default App;
