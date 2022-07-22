import './App.css';
import Home from './Home/Home.js';
import CameraView from './CameraView/CameraView.js';
import Map from './Map/Map.js';
import Chat from './Chat/Chat';
import NotificationHistory from './NotificationHistory/NotificationHistory';
import Help from './Help/Help';
import Setting from './Setting/Setting';
import SettingItem from './Setting/SettingItem';
import SettingSubItem from './Setting/SettingSubItem';
import Controller from './Controller/Controller';
import PageNotFound from './PageNotFound/PageNotFound';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/Home' element={<Home />} />
        <Route exact path='/CameraView' element={<CameraView />} />
        <Route exact path='/Map' element={<Map />} />
        <Route exact path='/Chat' element={<Chat />} />
        <Route exact path='/NotificationHistory' element={<NotificationHistory />} />
        <Route exact path='/Help' element={<Help />} />
        <Route exact path='/Setting' element={<Setting />} />
        <Route exact path='/Setting/Item' element={<SettingItem />} />
        <Route exact path='/Setting/Accessibility/Item' element={<SettingSubItem />} />
        <Route exact path='/Controller' element={<Controller />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
