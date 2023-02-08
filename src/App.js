import './App.css';
import BrandManagerDashboard from "./components/brandManagerDashboard/BrandManagerDashboard";
import AllCampaigns from "./components/AllCampaignsPage/AllCampaigns";
import Navbarr from './components/navbar/Navbarr';
import AllRegisteredInfluencers from './components/AllRegisteredInfluencers/AllRegisteredInfluencers';
import {Route, Routes} from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Navbarr/>
      <Routes>
        <Route path="/BMDashboard" element={<BrandManagerDashboard/>}/>
        <Route path="/BMCampaigns" element={<AllCampaigns/>}/>
        <Route path="/BMRegisteredInfluencers" element={<AllRegisteredInfluencers/>}/>
      </Routes>
  </div>
  );
}

export default App;
