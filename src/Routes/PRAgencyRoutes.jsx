import { useLocation } from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';

import NewPRPopup from '../panels/AdminPanel/PRList/NewPRPopup';
import PRLogin from '../panels/PRAgency/Auth/Login';
import PRSignup from '../panels/PRAgency/Auth/Signup';
import PRForgotPassword from '../panels/PRAgency/Auth/ForgotPassword';
import PREmailSent from '../panels/PRAgency/Auth/EmailSent';
import PRResetPassword from '../panels/PRAgency/Auth/ResetPassword';
import PRResetted from '../panels/PRAgency/Auth/Resetted';
import BMList from '../panels/PRAgency/BrandManagerList/BMList';
import NewBMPopup from '../panels/PRAgency/BrandManagerList/NewBMPopup';
import PRDashboard from '../panels/PRAgency/PRDashboard.jsx';

import PRNavbar from '../panels/PRAgency/Navbar/PRNavbar';

const PRAgencyRoutes = () => {
  const location = useLocation();
  return (
    <div>
    {location.pathname === '/NewPRPopup'&& location.pathname === '/BMList' &&  location.pathname === '/PRDashboard' 
    ? <PRNavbar/> : null}
    
       <Routes>
         <Route exact path="/NewPRPopup" element={<NewPRPopup/>}/>
         <Route exact path="/PRLogin" element={<PRLogin/>}/>
         <Route exact path="/PRSignup" element={<PRSignup/>}/>
         <Route exact path="/PRForgot" element={<PRForgotPassword/>}/>
         <Route exact path="/PREmailSent" element={<PREmailSent/>}/>  
         <Route exact path="/PRResetPassword" element={<PRResetPassword/>}/>  
         <Route exact path="/PRResetted" element={<PRResetted/>}/>  
         <Route exact path="/BMList" element={<BMList/>}/>
         <Route exact path="/NewBMPopup" element={<NewBMPopup/>}/>
         <Route exact path="/PRDashboard" element={<PRDashboard/>}/>
       </Routes>
    </div>
    ) 
}

export default PRAgencyRoutes;
