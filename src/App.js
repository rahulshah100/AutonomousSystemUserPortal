import './App.css';
import Home from './Home/Home';
import CameraView from './CameraView/CameraView';
import Map from './Map/Map';
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
        <Route exact path='/AutonomousSystemUserPortal/' element={<Home />} />
        <Route  path='' element={<Home />} />
        <Route exact path='/AutonomousSystemUserPortal/Home' element={<Home />} />
        <Route exact path='/AutonomousSystemUserPortal/CameraView' element={<CameraView />} />
        <Route exact path='/AutonomousSystemUserPortal/Map' element={<Map />} />
        <Route exact path='/AutonomousSystemUserPortal/Chat' element={<Chat />} />
        <Route exact path='/AutonomousSystemUserPortal/NotificationHistory' element={<NotificationHistory />} />
        <Route exact path='/AutonomousSystemUserPortal/Help' element={<Help />} />
        <Route exact path='/AutonomousSystemUserPortal/Setting' element={<Setting />} />
        <Route exact path='/AutonomousSystemUserPortal/Setting/Item' element={<SettingItem />} />
        <Route exact path='/AutonomousSystemUserPortal/Setting/Accessibility/Item' element={<SettingSubItem />} />
        <Route exact path='/AutonomousSystemUserPortal/Controller' element={<Controller />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
