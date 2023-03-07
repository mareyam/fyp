import './App.css';
import BrandManagerDashboard from './panels/BrandManagerPanel/BrandManagerDashboard';
import AllCampaigns from './panels/BrandManagerPanel/Campaigns/AllCampaigns';
import Navbarr from './panels/BrandManagerPanel/Navbar/Navbarr';
import AllRegisteredInfluencers from './panels/BrandManagerPanel/Influencers/AllRegisteredInfluencers';
import AllStories from './panels/BrandManagerPanel/PostsStories/AllStoriesOfInfluencers';
import {Route, Routes} from 'react-router-dom';
import HashTags from './panels/BrandManagerPanel/Hashtags/HashTags';
import AllPosts from './panels/BrandManagerPanel/PostsStories/AllPostsOfInfluencers';
import CampaignDetails from './panels/BrandManagerPanel/Campaigns/CampaignDetails';
import CompareInfluencers from './panels/BrandManagerPanel/Influencers/CompareInfluencers'
import NewCampaign from './panels/BrandManagerPanel/Campaigns/NewCampaign'
import Privacy from './panels/BrandManagerPanel/Others/Privacy';
import Terms from './panels/BrandManagerPanel/Others/Terms';
import BrandPDF from './panels/BrandManagerPanel/Reports/BrandPDF';
import InfluencerPDF from './panels/BrandManagerPanel/Reports/InfluencerPDF';
import Login from './panels/BrandManagerPanel/Auth/Login';
import Signup from './panels/BrandManagerPanel/Auth/Signup';
import InfluencerPage from './panels/BrandManagerPanel/Influencers/InfluencerPage';
import ForgotPassword from './panels/BrandManagerPanel/Auth/ForgotPassword';
import EmailSent from './panels/BrandManagerPanel/Auth/EmailSent';
import ResetPassword from './panels/BrandManagerPanel/Auth/ResetPassword';
import Resetted from './panels/BrandManagerPanel/Auth/Resetted';




const App = () => {
  return (
    <div>
      <Navbarr/>
      <Routes>
        <Route path="/BMDashboard" element={<BrandManagerDashboard/>}/>
        <Route path="/BMCampaigns" element={<AllCampaigns/>}/>
        <Route path="/BMRegisteredInfluencers" element={<AllRegisteredInfluencers/>}/>
        <Route path="/BMAllStories" element={<AllStories/>}/>
        <Route path="/BMHashtags" element={<HashTags/>}/>
        <Route path="/BMAllPosts" element={<AllPosts/>}/>
        <Route path="/BMCampaignDetails" element={<CampaignDetails/>}/>
        <Route path="/BMCompare" element={<CompareInfluencers/>}/>
        <Route path="/BMNewCampaign" element={<NewCampaign/>}/>
        <Route path="/BMPrivacy" element={<Privacy/>}/>
        <Route path="/BMTerms" element={<Terms/>}/>
        <Route path="/BMBrandPDF" element={<BrandPDF/>}/>
        <Route path="/BMInfluencerPDF" element={<InfluencerPDF/>}/>
        <Route path="/BMLogin" element={<Login/>}/>
        <Route path="/BMSignup" element={<Signup/>}/>
        <Route path="/BMInfluencerPage" element={<InfluencerPage/>}/>
        <Route path="/BMForgotPassword" element={<ForgotPassword/>}/>
        <Route path="/BMEmailSent" element={<EmailSent/>}/>  
        <Route path="/BMResetPassword" element={<ResetPassword/>}/>  
        <Route path="/BMResetted" element={<Resetted/>}/>  
              

      </Routes>
  </div>
  );
}

export default App;
