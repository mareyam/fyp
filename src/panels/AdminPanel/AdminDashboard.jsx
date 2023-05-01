import { Container } from 'react-grid-system';
import '../../Style/admindashboard.css'
import PRList from "./PRList/PR";

const AdminDashboard = () => {
  return (
    
    <div>
      <Container className="mt-3">
        <h4 className='header4AD text-left text-sm-left'>Admin DashBoard</h4>
        <PRList/>
        </Container>
  </div>
  );
}

export default AdminDashboard;
