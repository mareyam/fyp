import './App.css';
import BrandManagerDashboard from "./components/brandManagerDashboard/BrandManagerDashboard";
import AllCampaigns from "./components/AllCampaignsPage/AllCampaigns";
import Navbarr from './components/navbar/Navbarr';
import AllRegisteredInfluencers from './components/AllRegisteredInfluencers/AllRegisteredInfluencers';
import AllStories from './components/PostsAndStories/AllStories';
import {Route, Routes} from 'react-router-dom';
import Try from './components/Try';

const App = () => {
  return (
    <div>
      <Navbarr/>
      <Routes>
        <Route path="/BMDashboard" element={<BrandManagerDashboard/>}/>
        <Route path="/BMCampaigns" element={<AllCampaigns/>}/>
        <Route path="/BMRegisteredInfluencers" element={<AllRegisteredInfluencers/>}/>
        <Route path="/BMAllStories" element={<AllStories/>}/>
        <Route path="/BMTry" element={<Try/>}/>
        
      </Routes>
  </div>
  );
}

export default App;
