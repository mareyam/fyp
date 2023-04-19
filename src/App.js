import './App.css';
import { useLocation } from 'react-router-dom';

import BrandManagerDashboard from './panels/BrandManagerPanel/BrandManagerDashboard';
import AllCampaigns from './panels/BrandManagerPanel/Campaigns/AllCampaigns';
import Navbarr from './panels/BrandManagerPanel/Navbar/Navbarr';
import AllRegisteredInfluencers from './panels/BrandManagerPanel/Influencers/AllRegisteredInfluencers';
import {Route, Routes} from 'react-router-dom';
import HashTags from './panels/BrandManagerPanel/Hashtags/HashTags';
import AllContent from './panels/BrandManagerPanel/PostsStories/AllContentOfInfluencers';
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

import AdminLogin from './panels/AdminPanel/Auth/Login';
import AdminForgotPassword from './panels/AdminPanel/Auth/ForgotPassword';
import AdminEmailSent from './panels/AdminPanel/Auth/EmailSent';
import AdminResetPassword from './panels/AdminPanel/Auth/ResetPassword';
import AdminResetted from './panels/AdminPanel/Auth/Resetted';



import PRList from './panels/AdminPanel/PRList/PR';
import NewPRPopup from './panels/AdminPanel/PRList/NewPRPopup';

import PRLogin from './panels/PRAgency/Auth/Login';
import PRSignup from './panels/PRAgency/Auth/Signup';
import PRForgotPassword from './panels/PRAgency/Auth/ForgotPassword';
import PREmailSent from './panels/PRAgency/Auth/EmailSent';
import PRResetPassword from './panels/PRAgency/Auth/ResetPassword';
import PRResetted from './panels/PRAgency/Auth/Resetted';
import BMList from './panels/PRAgency/BrandManagerList/BMList';
import NewBMPopup from './panels/PRAgency/BrandManagerList/NewBMPopup';

import InfluencerLogin from './panels/InfluencerPanel/Auth/InfluencerLogin';
import InfluencerSignup from './panels/InfluencerPanel/Auth/InfluencerSignup';
import InfluencerRegDetails from './panels/InfluencerPanel/Auth/InfluencerRegDetails';
import InfluencerRegDetails2 from './panels/InfluencerPanel/Auth/InfluencerRegDetails2';
import InfluencerRegDetails3 from './panels/InfluencerPanel/Auth/InfluencerRegDetails3';
import InfluencerPosts from './panels/InfluencerPanel/PostsStories/InfluencerPosts';
import InfluencerDashboard from './panels/InfluencerPanel/PostsStories/InfluencerDashboard';
import PendingCampaigns from './panels/InfluencerPanel/Campaigns/PendingCampaigns';

import Home from './Home';
import Test from './Test';

const App = () => {
  const location = useLocation();
  return (
    <div>
       {location.pathname !== '/' && location.pathname !== '/BMSignup'&& location.pathname !== '/PRSignup' &&  location.pathname !== '/AdminLogin'
       &&  location.pathname !== '/PRLogin' &&  location.pathname !== '/BMLogin'  &&  location.pathname !== '/BMForgotPassword' 
       && location.pathname !== '/BMResetted' && location.pathname !== '/AdminLogin' && location.pathname !== '/AdminForgotPassword' 
       && location.pathname !== '/AdminReset' && location.pathname !== '/AdminResetted' && location.pathname !== '/AdminEmailSent' 
       && location.pathname !== '/PRLogin' && location.pathname !== '/PRForgot' && location.pathname !== '/PREmailSent' 
       && location.pathname !== '/PRResetPassword' && location.pathname !== '/PRResetted' && location.pathname !== '/InfluencerLogin'
       && location.pathname !== '/InfluencerSignup' && location.pathname !== '/InfluencerRegDetails' && location.pathname !== '/InfluencerRegDetails2'
       && location.pathname !== '/InfluencerRegDetails3'
       ? <Navbarr/> : null} 


      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/BMList" element={<BMList/>}/>
        <Route path="/PRLogin" element={<PRLogin/>}/>
        <Route path="/BMDashboard" element={<BrandManagerDashboard/>}/>
        <Route path="/BMHashtags" element={<HashTags/>}/>
        <Route path="/BMAllContent" element={<AllContent/>}/>
        <Route path="/BMCampaigns" element={<AllCampaigns/>}/> 
        <Route path="/BMRegisteredInfluencers" element={<AllRegisteredInfluencers/>}/>
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
        

        <Route path="/AdminLogin" element={<AdminLogin/>}/>
        <Route path="/AdminForgot" element={<AdminForgotPassword/>}/>
        <Route path="/AdminReset" element={<AdminResetPassword/>}/>
        <Route path="/AdminResetted" element={<AdminResetted/>}/>
        <Route path="/AdminEmailSent" element={<AdminEmailSent/>}/>
        
       
       
        <Route path="/PRList" element={<PRList/>}/>
        <Route path="/NewPRPopup" element={<NewPRPopup/>}/>
        <Route path="/PRLogin" element={<PRLogin/>}/>
        <Route path="/PRSignup" element={<PRSignup/>}/>
        <Route path="/PRForgot" element={<PRForgotPassword/>}/>
        <Route path="/PREmailSent" element={<PREmailSent/>}/>  
        <Route path="/PRResetPassword" element={<PRResetPassword/>}/>  
        <Route path="/PRResetted" element={<PRResetted/>}/>  
        <Route path="/BMList" element={<BMList/>}/>
        <Route path="/NewBMPopup" element={<NewBMPopup/>}/>


        <Route path="/InfluencerLogin" element={<InfluencerLogin/>}/>
        <Route path="/InfluencerSignup" element={<InfluencerSignup/>}/>
        <Route path="/InfluencerRegDetails" element={<InfluencerRegDetails/>}/>
        <Route path="/InfluencerRegDetails2" element={<InfluencerRegDetails2/>}/>
        <Route path="/InfluencerRegDetails3" element={<InfluencerRegDetails3/>}/>
        <Route path="/InfluencerPosts" element={<InfluencerPosts/>}/>
        <Route path="/InfluencerDashboard" element={<InfluencerDashboard/>}/>
        <Route path="/InfluencerPendingCampaigns" element={<PendingCampaigns/>}/>

        <Route path="/Test" element={<Test/>}/>

      </Routes>
  </div>
  );
}

export default App;
