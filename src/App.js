import './App.css';
import Controller from './Controller/Controller';
import HomePage from './HomePage/HomePage';
import NotificationHistory from './NotificationHistory/NotificationHistory';
import PageNotFound from './PageNotFound/PageNotFound';

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
        <Route exact path='/NotificationHistory' element={<NotificationHistory />} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
