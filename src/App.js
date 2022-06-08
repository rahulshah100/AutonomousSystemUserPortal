import './App.css';
import Home from './Home/Home';
import CameraView from './CameraView/CameraView';
import Map from './Map/Map';
import Chat from './Chat/Chat';
import NotificationHistory from './NotificationHistory/NotificationHistory';
import Controller from './Controller/Controller';
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
        <Route exact path='/' element={<Home/>} />
        <Route path='/CameraView' element={<CameraView/>}/>
        <Route path='/Map' element={<Map/>}/>
        <Route path='/Chat' element={<Chat/>}/>
        <Route exact path='/NotificationHistory' element={<NotificationHistory />} />
        <Route exact path='/Controller' element={<Controller />} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
