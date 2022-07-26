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
  // Variable used for marking the time when site is loaded. This variable is further used for keeping videos ongoing and in sync. Or else, only when you're on that page, the video would keep playing and as we go and come from any other page of this site onto the page where a video is there, then the video would start playing again from begining. 
  let siteStartedAt = new Date();

  // keep playing an audio in the background.
  let count = 0
  let audio = new Audio('audio/Trip1.mp3')
  audio.volume=0.2
  // audio.loop=true
  // audio.play()

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home siteStartedAt={siteStartedAt} />} />
        <Route exact path='/Home' element={<Home siteStartedAt={siteStartedAt} />} />
        <Route exact path='/CameraView' element={<CameraView siteStartedAt={siteStartedAt}/>} />
        <Route exact path='/Map' element={<Map />} />
        <Route exact path='/Chat' element={<Chat />} />
        <Route exact path='/NotificationHistory' element={<NotificationHistory />} />
        <Route exact path='/Help' element={<Help />} />
        <Route exact path='/Setting' element={<Setting />} />
        <Route exact path='/Setting/Item' element={<SettingItem />} />
        <Route exact path='/Setting/Accessibility/Item' element={<SettingSubItem />} />
        <Route exact path='/Controller' element={<Controller audio={audio}/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
