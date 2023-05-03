import { Container } from 'react-grid-system';
import '../../Style/admindashboard.css'
import PRList from "./PRList/PR";
import Navbar from './Navbar/AdminNavbar';

const AdminDashboard = () => {
  return (
    
    <div>
      <Navbar/>
      <Container className="mt-3">
        <h4 className='header4AD text-left text-sm-left'>Admin DashBoard</h4>
        <PRList/>
        </Container>
  </div>
  );
}

export default AdminDashboard;
