import { useLocation } from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';

import AdminNavbar from '../panels/AdminPanel/Navbar/AdminNavbar';
import AdminDashboard from '../panels/AdminPanel/AdminDashboard';
import AdminLogin from '../panels/AdminPanel/Auth/Login';
import AdminForgotPassword from '../panels/AdminPanel/Auth/ForgotPassword';
import AdminEmailSent from '../panels/AdminPanel/Auth/EmailSent';
import AdminResetPassword from '../panels/AdminPanel/Auth/ResetPassword';
import AdminResetted from '../panels/AdminPanel/Auth/Resetted';
import AdminBMList from '../panels/AdminPanel/BMList/BMList';
import AdminRegisteredInfluencers from '../panels/AdminPanel/Influencers/RegisteredInfluencers';
import AdminHashTags from '../panels/AdminPanel/Hashtags/HashTags';
import AdminCampaigns from '../panels/AdminPanel/Campaigns/Campaigns';
import AdminPRList from '../panels/AdminPanel/PRList/PR';


const AdminRoutes = () => {
  const location = useLocation();
  return (
    <div>
       {location.pathname === '/AdminDashboard'&& location.pathname === '/AdminBMList' && 
       location.pathname === '/AdminRegisteredInfluencers' && location.pathname === '/AdminHashtags' 
       && location.pathname === '/AdminCampaigns' && location.pathname === '/AdminPRList'   
       ? <AdminNavbar/> : null}

       <Routes>
            <Route exact path="/AdminLogin" element={<AdminLogin/>}/>
            <Route exact path="/AdminForgot" element={<AdminForgotPassword/>}/>
            <Route exact path="/AdminReset" element={<AdminResetPassword/>}/>
            <Route exact path="/AdminResetted" element={<AdminResetted/>}/>
            <Route exact path="/AdminEmailSent" element={<AdminEmailSent/>}/>      
            <Route exact path="/AdminDashboard" element={<AdminDashboard/>}/>  
            <Route exact path="/AdminBMList" element={<AdminBMList/>}/>
            <Route exact path="/AdminPRList" element={<AdminPRList/>}/>
            <Route exact path="/AdminRegisteredInfluencers" element={<AdminRegisteredInfluencers/>}/>
            <Route exact path="/AdminCampaigns" element={<AdminCampaigns/>}/> 
            <Route exact path="/AdminHashtags" element={<AdminHashTags/>}/>
       </Routes>
    </div>
    ) 
}

export default AdminRoutes;

// // import './App.css';
// import { useLocation } from 'react-router-dom';

// // import BrandManagerDashboard from './panels/BrandManagerPanel/BrandManagerDashboard';
// // import AllCampaigns from './panels/BrandManagerPanel/Campaigns/AllCampaigns';
// // import InactiveCampaigns from './panels/BrandManagerPanel/Campaigns/InactiveCampaigns';
// import Navbar from '../panels/BrandManagerPanel/Navbar/Navbar';
// // import AllRegisteredInfluencers from './panels/BrandManagerPanel/Influencers/AllRegisteredInfluencers';
// import {Route, Routes} from 'react-router-dom';
// // import HashTags from './panels/BrandManagerPanel/Hashtags/HashTags';
// // import AllContent from './panels/BrandManagerPanel/PostsStories/AllContentOfInfluencers';
// // import CampaignDetails from './panels/BrandManagerPanel/Campaigns/CampaignDetails';
// // import CompareInfluencers from './panels/BrandManagerPanel/Influencers/CompareInfluencers'
// // import NewCampaign from './panels/BrandManagerPanel/Campaigns/NewCampaign'
// // import Privacy from './panels/BrandManagerPanel/Others/Privacy';
// // import Terms from './panels/BrandManagerPanel/Others/Terms';
// // import BrandPDF from './panels/BrandManagerPanel/Reports/BrandPDF';
// // import InfluencerPDF from './panels/BrandManagerPanel/Reports/InfluencerPDF';
// // import Login from './panels/BrandManagerPanel/Auth/Login';
// // import Signup from './panels/BrandManagerPanel/Auth/Signup';
// // import InfluencerPage from './panels/BrandManagerPanel/Influencers/InfluencerPage';
// // import ForgotPassword from './panels/BrandManagerPanel/Auth/ForgotPassword';
// // import EmailSent from './panels/BrandManagerPanel/Auth/EmailSent';
// // import ResetPassword from './panels/BrandManagerPanel/Auth/ResetPassword';
// // import Resetted from './panels/BrandManagerPanel/Auth/Resetted';




// // import PRList from './panels/AdminPanel/PRList/PR';
// // import NewPRPopup from './panels/AdminPanel/PRList/NewPRPopup';

// // import PRNavbar from './panels/PRAgency/Navbar/PRNavbar';
// // import PRLogin from './panels/PRAgency/Auth/Login';
// // import PRSignup from './panels/PRAgency/Auth/Signup';
// // import PRForgotPassword from './panels/PRAgency/Auth/ForgotPassword';
// // import PREmailSent from './panels/PRAgency/Auth/EmailSent';
// // import PRResetPassword from './panels/PRAgency/Auth/ResetPassword';
// // import PRResetted from './panels/PRAgency/Auth/Resetted';
// // import BMList from './panels/PRAgency/BrandManagerList/BMList';
// // import NewBMPopup from './panels/PRAgency/BrandManagerList/NewBMPopup';
// // import PRDashboard from './panels/PRAgency/PRDashboard.jsx';

// // import InfluencerNavbar from './panels/InfluencerPanel/Navbar/InfluencerNavbar';
// // import InfluencerLogin from './panels/InfluencerPanel/Auth/InfluencerLogin';
// // import InfluencerSignup from './panels/InfluencerPanel/Auth/InfluencerSignup';
// // import InfluencerRegDetails from './panels/InfluencerPanel/Auth/InfluencerRegDetails';
// // import InfluencerRegDetails2 from './panels/InfluencerPanel/Auth/InfluencerRegDetails2';
// // import InfluencerRegDetails3 from './panels/InfluencerPanel/Auth/InfluencerRegDetails3';
// // import InfluencerPosts from './panels/InfluencerPanel/PostsStories/InfluencerPosts';
// // import InfluencerContent from './panels/InfluencerPanel/PostsStories/InfluencerContent';

// // import PendingCampaigns from './panels/InfluencerPanel/Campaigns/PendingCampaigns';

// // import Home from './Home';
// import Test from '../Test.jsx';
// import Test2 from '../Test2';
// import Test3 from '../Test3';

// // import Error404 from './panels/Error404';

// const App = () => {
//   const location = useLocation();
//   return (
//     <div> 

// {location.pathname != '/Test' ?  <Navbar/> : null}

//      <Navbar/>
//       <Routes>
//         <Route exact path="/" element={<Home/>}/>
//         <Route exact path="/BMDashboard" element={<BrandManagerDashboard/>}/>
//         <Route exact path="/BMHashtags" element={<HashTags/>}/>
//         <Route exact path="/BMAllContent" element={<AllContent/>}/>
//         <Route exact path="/BMCampaigns" element={<AllCampaigns/>}/> 
//         <Route exact path="/BMInactiveCampaigns" element={<InactiveCampaigns/>}/>
        
//         <Route exact path="/BMRegisteredInfluencers" element={<AllRegisteredInfluencers/>}/>
//         <Route exact path="/BMCampaignDetails" element={<CampaignDetails/>}/>
//         <Route exact path="/BMCompare" element={<CompareInfluencers/>}/>
//         <Route exact path="/BMNewCampaign" element={<NewCampaign/>}/>
//         <Route exact path="/BMPrivacy" element={<Privacy/>}/>
//         <Route exact path="/BMTerms" element={<Terms/>}/>
//         <Route exact path="/BMBrandPDF" element={<BrandPDF/>}/> 
//         <Route exact path="/BMInfluencerPDF" element={<InfluencerPDF/>}/>
//         <Route exact path="/BMLogin" element={<Login/>}/>
//         <Route exact path="/BMSignup" element={<Signup/>}/>
//         <Route exact path="/BMInfluencerPage" element={<InfluencerPage/>}/>
//         <Route exact path="/BMForgot" element={<ForgotPassword/>}/>
//         <Route exact path="/BMEmailSent" element={<EmailSent/>}/>  
//         <Route exact path="/BMResetPassword" element={<ResetPassword/>}/>  
//         <Route exact path="/BMResetted" element={<Resetted/>}/>

        

//         <Route exact path="/AdminLogin" element={<AdminLogin/>}/>
//         <Route exact path="/AdminForgot" element={<AdminForgotPassword/>}/>
//         <Route exact path="/AdminReset" element={<AdminResetPassword/>}/>
//         <Route exact path="/AdminResetted" element={<AdminResetted/>}/>
//         <Route exact path="/AdminEmailSent" element={<AdminEmailSent/>}/>      
//         <Route exact path="/AdminDashboard" element={<AdminDashboard/>}/>  
//         <Route exact path="/AdminBMList" element={<AdminBMList/>}/>
//         <Route exact path="/AdminRegisteredInfluencers" element={<AdminRegisteredInfluencers/>}/>
//         <Route exact path="/AdminCampaigns" element={<AdminCampaigns/>}/> 
//         <Route exact path="/AdminHashtags" element={<AdminHashTags/>}/>

//         <Route exact path="/NewPRPopup" element={<NewPRPopup/>}/>
//         <Route exact path="/PRLogin" element={<PRLogin/>}/>
//         <Route exact path="/PRSignup" element={<PRSignup/>}/>
//         <Route exact path="/PRForgot" element={<PRForgotPassword/>}/>
//         <Route exact path="/PREmailSent" element={<PREmailSent/>}/>  
//         <Route exact path="/PRResetPassword" element={<PRResetPassword/>}/>  
//         <Route exact path="/PRResetted" element={<PRResetted/>}/>  
//         <Route exact path="/BMList" element={<BMList/>}/>
//         <Route exact path="/NewBMPopup" element={<NewBMPopup/>}/>
//         <Route exact path="/PRDashboard" element={<PRDashboard/>}/>




//         <Route exact path="/InfluencerContent" element={<InfluencerContent/>}/>
//         <Route exact path="/InfluencerLogin" element={<InfluencerLogin/>}/>
//         <Route exact path="/InfluencerSignup" element={<InfluencerSignup/>}/>
//         <Route exact path="/InfluencerRegDetails" element={<InfluencerRegDetails/>}/>
//         <Route exact path="/InfluencerRegDetails2" element={<InfluencerRegDetails2/>}/>
//         <Route exact path="/InfluencerRegDetails3" element={<InfluencerRegDetails3/>}/>
//         <Route exact path="/InfluencerPosts" element={<InfluencerPosts/>}/>
//         <Route exact path="/InfluencerPendingCampaigns" element={<PendingCampaigns/>}/>

//         <Route exact path="/Test" element={<Test/>}/>
//         <Route exact path="/Test2" element={<Test2/>}/>
//         <Route exact path="/Test3" element={<Test3/>}/>
        
        
//         <Route path="*" element={<Error404/>}/>

//       </Routes>
//   </div>
//   );
// }

// export default App;



// // {location.pathname !== '/BMSignup'&& location.pathname !== '/PRSignup' &&  location.pathname !== '/AdminLogin'
// // &&  location.pathname !== '/PRLogin' &&  location.pathname !== '/BMLogin'  &&  location.pathname !== '/BMForgotPassword' 
// // && location.pathname !== '/BMResetted' && location.pathname !== '/AdminLogin' && location.pathname !== '/AdminForgotPassword' 
// // && location.pathname !== '/AdminReset' && location.pathname !== '/AdminResetted' && location.pathname !== '/AdminEmailSent' 
// // && location.pathname !== '/PRLogin' && location.pathname !== '/PRForgot' && location.pathname !== '/PREmailSent' 
// // && location.pathname !== '/PRResetPassword' && location.pathname !== '/PRResetted' && location.pathname !== '/InfluencerLogin'
// // && location.pathname !== '/InfluencerSignup' && location.pathname !== '/InfluencerRegDetails' && location.pathname !== '/InfluencerRegDetails2'
// // && location.pathname !== '/InfluencerRegDetails3' && location.pathname !== '/AdminDashboard' && location.pathname === '/BMList' && location.pathname !== '/InfluencerDashboard' && location.pathname === '/InfluencerContent'
// // && location.pathname !== '/PRDashboard'? <Navbarr/> : null} 



// // {location.pathname === '/BMDashboard' &&
// // location.pathname === '/BMCampaigns' &&
// // location.pathname === '/BMInfluencers' &&
// // location.pathname === '/BMContent' &&
// // location.pathname === '/BMHashtags'?  <Navbarr/> : null}

// // {location.pathname === '/AdminDashboard' &&
// // location.pathname === '/BMList'
// // ?
// // <AdminNavbar/> : null}
// // {location.pathname === '/PRDashboard'? <PRNavbar/> : null}
// // {location.pathname === '/InfluencerDashboard' && location.pathname === '/InfluencerContent' ? <InfluencerNavbar/> : null}