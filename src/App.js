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
      </Routes>
  </div>
  );
}

export default App;
