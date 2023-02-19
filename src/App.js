import './App.css';
import BrandManagerDashboard from "./components/brandManagerDashboard/BrandManagerDashboard";
import AllCampaigns from "./components/AllCampaignsPage/AllCampaigns";
import Navbarr from './components/navbar/Navbarr';
import AllRegisteredInfluencers from './components/AllRegisteredInfluencers/AllRegisteredInfluencers';
import AllStories from './components/PostsAndStories/AllStoriesOfInfluencers';
import {Route, Routes} from 'react-router-dom';
import Try from './components/Try';
import HashTags from './components/brandManagerDashboard/Hashtags/HashTags';
import AllPosts from './components/PostsAndStories/AllPostsOfInfluencers';
import CampaignDetails from './components/AllCampaignsPage/CampaignDetails';
import CompareInfluencers from './components/AllRegisteredInfluencers/CompareInfluencers';
import NewCampaign from './components/NewCampaigns/NewCampaign';
import Privacy from './components/others/Privacy';
import Terms from './components/others/Terms';
import BrandPDF from './components/Reports/BrandPDF';
import InfluencerPDF from './components/Reports/InfluencerPDF';


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
        <Route path="/BMHashtags" element={<HashTags/>}/>
        <Route path="/BMAllStories" element={<AllStories/>}/>
        <Route path="/BMAllPosts" element={<AllPosts/>}/>
        <Route path="/BMCampaignDetails" element={<CampaignDetails/>}/>
        <Route path="/BMCompare" element={<CompareInfluencers/>}/>
        <Route path="/BMNewCampaign" element={<NewCampaign/>}/>
        <Route path="/BMPrivacy" element={<Privacy/>}/>
        <Route path="/BMTerms" element={<Terms/>}/>
        <Route path="/BMBrandPDF" element={<BrandPDF/>}/>
        <Route path="/BMInfluencerPDF" element={<InfluencerPDF/>}/>
        
      </Routes>
  </div>
  );
}

export default App;
