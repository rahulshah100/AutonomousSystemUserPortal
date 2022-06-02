import './App.css';
import Controller from './Components/Controller';
import HomePage from './Components/HomePage';
import PageNotFound from './Components/PageNotFound';

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
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/Controller' element={<Controller />} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
