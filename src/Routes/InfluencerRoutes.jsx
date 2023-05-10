import { useLocation } from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';


import InfluencerNavbar from '../panels/InfluencerPanel/Navbar/InfluencerNavbar';
import InfluencerLogin from '../panels/InfluencerPanel/Auth/InfluencerLogin';
import InfluencerSignup from '../panels/InfluencerPanel/Auth/InfluencerSignup';
import InfluencerRegDetails from '../panels/InfluencerPanel/Auth/InfluencerRegDetails';
import InfluencerRegDetails2 from '../panels/InfluencerPanel/Auth/InfluencerRegDetails2';
import InfluencerRegDetails3 from '../panels/InfluencerPanel/Auth/InfluencerRegDetails3';
import InfluencerPosts from '../panels/InfluencerPanel/PostsStories/InfluencerPosts';
import InfluencerContent from '../panels/InfluencerPanel/PostsStories/InfluencerContent';
import PendingCampaigns from '../panels/InfluencerPanel/Campaigns/PendingCampaigns';
import InfluencerDashboard from '../panels/InfluencerPanel/InfluencerDashboard';

const PRAgencyRoutes = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === '/InfluencerContent'&& location.pathname === '/InfluencerPosts' && 
       location.pathname === '/InfluencerPendingCampaigns' && location.pathname === '/InfluencerDashboard' 
       ? <InfluencerNavbar/> : null}

       <Routes>
            <Route exact path="/InfluencerContent" element={<InfluencerContent/>}/>
            <Route exact path="/InfluencerLogin" element={<InfluencerLogin/>}/>
            <Route exact path="/InfluencerSignup" element={<InfluencerSignup/>}/>
            <Route exact path="/InfluencerRegDetails" element={<InfluencerRegDetails/>}/>
            <Route exact path="/InfluencerRegDetails2" element={<InfluencerRegDetails2/>}/>
            <Route exact path="/InfluencerRegDetails3" element={<InfluencerRegDetails3/>}/>
            <Route exact path="/InfluencerPosts" element={<InfluencerPosts/>}/>
            <Route exact path="/InfluencerPendingCampaigns" element={<PendingCampaigns/>}/>
            <Route exact path="/InfluencerDashboard" element={<InfluencerDashboard/>}/> 
       </Routes>
    </div>
    ) 
}

export default PRAgencyRoutes;
