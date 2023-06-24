import './App.css';
import { useLocation } from 'react-router-dom';

import BrandManagerDashboard from './panels/BrandManagerPanel/BrandManagerDashboard';
import AllCampaigns from './panels/BrandManagerPanel/Campaigns/AllCampaigns';
import InactiveCampaigns from './panels/BrandManagerPanel/Campaigns/InactiveCampaigns';
import Navbar from './panels/BrandManagerPanel/Navbar/Navbar';
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

import AdminNavbar from './panels/AdminPanel/Navbar/AdminNavbar';
import AdminDashboard from './panels/AdminPanel/AdminDashboard';
import AdminBMList from './panels/AdminPanel/BMList/BMList';
import AdminRegisteredInfluencers from './panels/AdminPanel/Influencers/AllRegisteredInfluencers';
import AdminPRList from './panels/AdminPanel/PRList/PR';
import NewPRPopup from './panels/AdminPanel/PRList/NewPRPopup';

import PRNavbar from './panels/PRAgency/Navbar/PRNavbar';
import PRBMList from './panels/PRAgency/BrandManagerList/BMList';
import NewBMPopup from './panels/PRAgency/BrandManagerList/NewBMPopup';
import PRDashboard from './panels/PRAgency/PRDashboard.jsx';
import PRRegisteredInfluencers from './panels/PRAgency/Influencers/AllRegisteredInfluencers';
import PRCampaigns from './panels/PRAgency/Campaigns/PRCampaigns';
import PRContent from './panels/PRAgency/Content/PRContent';


import InfluencerNavbar from './panels/InfluencerPanel/Navbar/InfluencerNavbar';
import InfluencerLogin from './panels/InfluencerPanel/Auth/InfluencerLogin';
import InfluencerSignup from './panels/InfluencerPanel/Auth/InfluencerSignup';
import InfluencerRegDetails from './panels/InfluencerPanel/Auth/InfluencerRegDetails';
import InfluencerRegDetails2 from './panels/InfluencerPanel/Auth/InfluencerRegDetails2';
import InfluencerRegDetails3 from './panels/InfluencerPanel/Auth/InfluencerRegDetails3';
import InfluencerContent from './panels/InfluencerPanel/PostsStories/InfluencerContent';

import PendingCampaigns from './panels/InfluencerPanel/Campaigns/PendingCampaigns';

import Error404 from './panels/Error404';
import Home from './Home';
import Test from './Test';
import Test2 from './Test2';
import Test3 from './Test3';
import Login from './panels/Login';
import ForgotPassword from './panels/ForgotPassword'
import EmailSent from './panels/EmailSent'
import ChangePassword from './panels/ChangePassword';
import Registration from './panels/Registration';

const App = () => {
  const location = useLocation();
  return (
    <div>  
    {/* {(location.pathname === '/BMDashboard' || location.pathname === '/BMHashtags') && <Navbar/>} 
    {(location.pathname === '/AdminDashboard' || location.pathname === '/AdminBMList') && <AdminNavbar/>}
         */}
        
        {(location.pathname === '/BMDashboard'|| location.pathname === '/BMHashtags' ||  location.pathname === '/BMAllContent'
        ||  location.pathname === '/BMCampaigns' ||  location.pathname === '/BMInactiveCampaigns' ||  location.pathname === '/BMRegisteredInfluencers'
        ||  location.pathname === '/BMCampaignDetails' ||  location.pathname === '/BMCompare' ||  location.pathname === '/BMNewCampaign' 
        ||  location.pathname === '/BMPrivacy' ||  location.pathname === '/BMTerms'  ||  location.pathname === '/BMBrandPDF' 
        ||  location.pathname === '/BMInfluencerPDF' ||  location.pathname === '/BMInfluencerPage') && <Navbar/> } 
  
       {(location.pathname === '/AdminDashboard'|| location.pathname === '/AdminBMList' 
       || location.pathname === '/AdminRegisteredInfluencers' || location.pathname === '/AdminPRList' || location.pathname === '/NewPRPopup') && <AdminNavbar/> }

       {(location.pathname === '/PRDashboard'|| location.pathname === '/PRBMList' 
       || location.pathname === '/PRRegisteredInfluencers' || location.pathname === '/NewBMPopup' || location.pathname === '/PRCampaigns'
      || location.pathname === '/PRContent'
       )         && <PRNavbar/> }

       {(location.pathname === '/InfluencerContent'|| location.pathname === '/InfluencerPosts' 
       || location.pathname === '/InfluencerPendingCampaigns') && <InfluencerNavbar/> }


      
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/> 
        <Route exact path="/forgetpassword" element={<ForgotPassword/>}/> 
        <Route exact path="/emailsent" element={<EmailSent/>}/> 
        <Route exact path="/changepassword/:token" element={<ChangePassword/>}/> 
        <Route exact path="/registration/:token" element={<Registration/>}/> 
        

        <Route exact path="/BMDashboard" element={<BrandManagerDashboard/>}/>
        <Route exact path="/BMHashtags" element={<HashTags/>}/>
        <Route exact path="/BMAllContent" element={<AllContent/>}/>
        <Route exact path="/BMCampaigns" element={<AllCampaigns/>}/> 
        <Route exact path="/BMInactiveCampaigns" element={<InactiveCampaigns/>}/>
        <Route exact path="/BMRegisteredInfluencers" element={<AllRegisteredInfluencers/>}/>
        <Route exact path="/BMCampaignDetails" element={<CampaignDetails/>}/>
        <Route exact path="/BMCompare" element={<CompareInfluencers/>}/>
        <Route exact path="/BMNewCampaign" element={<NewCampaign/>}/>
        <Route exact path="/BMPrivacy" element={<Privacy/>}/>
        <Route exact path="/BMTerms" element={<Terms/>}/>
        <Route exact path="/BMBrandPDF" element={<BrandPDF/>}/> 
        <Route exact path="/BMInfluencerPDF" element={<InfluencerPDF/>}/>
      
        
       <Route exact path="/AdminDashboard" element={<AdminDashboard/>}/>  
        <Route exact path="/AdminBMList" element={<AdminBMList/>}/>
        <Route exact path="/AdminPRList" element={<AdminPRList/>}/>
        <Route exact path="/AdminRegisteredInfluencers" element={<AdminRegisteredInfluencers/>}/>
        <Route exact path="/NewPRPopup" element={<NewPRPopup/>}/>
        
        <Route exact path="/PRBMList" element={<PRBMList/>}/>
        <Route exact path="/NewBMPopup" element={<NewBMPopup/>}/>
        <Route exact path="/PRDashboard" element={<PRDashboard/>}/>
        <Route exact path="/PRRegisteredInfluencers" element={<PRRegisteredInfluencers/>}/>
        <Route exact path="/PRCampaigns" element={<PRCampaigns/>}/>
        <Route exact path="/PRContent" element={<PRContent/>}/>
        
        
        <Route exact path="/InfluencerContent" element={<InfluencerContent/>}/>
        <Route exact path="/InfluencerLogin" element={<InfluencerLogin/>}/>
        <Route exact path="/InfluencerSignup" element={<InfluencerSignup/>}/>
        <Route exact path="/InfluencerRegDetails" element={<InfluencerRegDetails/>}/>
        <Route exact path="/InfluencerRegDetails2" element={<InfluencerRegDetails2/>}/>
        <Route exact path="/InfluencerRegDetails3" element={<InfluencerRegDetails3/>}/>
        <Route exact path="/InfluencerPendingCampaigns" element={<PendingCampaigns/>}/>

        <Route exact path="/Test" element={<Test/>}/>
        <Route exact path="/Test2" element={<Test2/>}/>
        <Route exact path="/Test3" element={<Test3/>}/>
        
        
        <Route path="*" element={<Error404/>}/>

      </Routes>
  </div>
  );
}

export default App;



// {location.pathname !== '/BMSignup'&& location.pathname !== '/PRSignup' &&  location.pathname !== '/AdminLogin'
// &&  location.pathname !== '/PRLogin' &&  location.pathname !== '/BMLogin'  &&  location.pathname !== '/BMForgotPassword' 
// && location.pathname !== '/BMResetted' && location.pathname !== '/AdminLogin' && location.pathname !== '/AdminForgotPassword' 
// && location.pathname !== '/AdminReset' && location.pathname !== '/AdminResetted' && location.pathname !== '/AdminEmailSent' 
// && location.pathname !== '/PRLogin' && location.pathname !== '/PRForgot' && location.pathname !== '/PREmailSent' 
// && location.pathname !== '/PRResetPassword' && location.pathname !== '/PRResetted' && location.pathname !== '/InfluencerLogin'
// && location.pathname !== '/InfluencerSignup' && location.pathname !== '/InfluencerRegDetails' && location.pathname !== '/InfluencerRegDetails2'
// && location.pathname !== '/InfluencerRegDetails3' && location.pathname !== '/AdminDashboard' && location.pathname === '/' && location.pathname !== '/InfluencerDashboard' && location.pathname === '/InfluencerContent'
// && location.pathname !== '/PRDashboard'? <Navbarr/> : null} 



// {location.pathname === '/BMDashboard' &&
// location.pathname === '/BMCampaigns' &&
// location.pathname === '/BMInfluencers' &&
// location.pathname === '/BMContent' &&
// location.pathname === '/BMHashtags'?  <Navbarr/> : null}

// {location.pathname === '/AdminDashboard' &&
// location.pathname === '/BMList'
// ?
// <AdminNavbar/> : null}
// {location.pathname === '/PRDashboard'? <PRNavbar/> : null}
// {location.pathname === '/InfluencerDashboard' && location.pathname === '/InfluencerContent' ? <InfluencerNavbar/> : null}
