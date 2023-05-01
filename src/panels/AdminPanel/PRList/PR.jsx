import axios from "axios";
import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import NewPRPopup from './NewPRPopup';
import PRList from './PRList';

const Pagintation = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i); //number of pages i.e 3
    }
    return (
      <nav style={{marginBottom:'-5%'}}>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a onClick={() => paginate(number)} href={currentPage} className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };


const PR = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [searchValue, setSearchValue] = useState('');
  const [PR, setPR] = useState(PRList);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

   useEffect(() => {
      axios.get('http://127.0.0.1:8000/pragencys/')
        .then(response => {
          setPR(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchValue(searchText);
    let results = PR;
    if (searchText) {
      results = PR.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    setPR(results);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PR.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  

  const Status = ({ status }) => {
    let color;
    if (status === 'active') {
      color = 'green';
    } else if (status === 'suspended') {
      color = 'red';
    } else {
      color = 'gray';
    }
    return <p style={{ color }}>{status}</p>;
  };
  
  const ActionButton = ({ status }) => {
    let bgColor;
    let text;
    if (status === 'active') {
      bgColor = 'red';
      text = 'Deactivate';
    } else if (status === 'suspended') {
      bgColor = 'green';
      text = 'Activate';
    } else {
      bgColor = 'gray';
      text = 'Activate';
    }
    return <Button style={{ backgroundColor: bgColor, color: 'white' }}>{text}</Button>;
  };
  
  const TableCell = ({ children }) => {
    return <td style={{ border: '1px solid rgb(212, 211, 211)', fontSize: '15px' }}>{children}</td>;
  };
  
  const handleButtonState = ({status}) => {
    let bgColor;
    let text;
    if(status === 'active') {
      bgColor = 'red';
      text = 'Deactivate';
    }
    else if (status === 'suspended') {
      bgColor = 'green';
      text = 'Activate';
    } else {
      bgColor = 'gray';
      text = 'Activate';
    }
  };

  const handleOpenPopUp = () => {
    setIsPopUpOpen(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
  };


return (
  <Container className='mt-1'>
      <Row>
          <Col xs={12} sm={12} md={12} lg={12} className='d-flex'>
            <h5>PR Agencies</h5>
            <div className='addNewPR'>
                  <Button style={{ backgroundColor:'#452c63', height:'30px', marginLeft:'5px' }} onClick={handleOpenPopUp}>
                    <div style={{ marginTop:"-6px" }}>
                      Add<AddIcon style={{ fontSize:"12px", height:"25px" }}/>
                    </div>
                  </Button>
                  {isPopUpOpen && (
                    <>
                      <div
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          zIndex: 1,
                        }}
                        onClick={handleClosePopUp}
                      />
                      <NewPRPopup onClose={handleClosePopUp} />
                    </>
                  )}
            </div>
          </Col>
          <Col>
          <div className="tablee">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                    <th className="">Name</th>
                    <th className="" scope="col">Email</th>
                    <th className="" scope="col">Status</th>
                    <th className="" scope="col">Action</th>
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {currentItems.map(item => {
                          return (
                              <tr>
                                 <TableCell>{item.name}</TableCell>
                                  <TableCell>{item.email}</TableCell>
                                  <TableCell>{item.image}</TableCell>                  
                                   <TableCell><Status status={item.status} /></TableCell>
                                  <TableCell><ActionButton status={item.status}   onClick={() => handleButtonState(item.status)}/></TableCell>                                  

                              </tr> )})}                                 
                                 
                      <Pagintation
                          itemsPerPage={itemsPerPage}
                          totalItems={PR.length}
                          paginate={paginate}/>
                </tbody>      
          </table>
          </div>
          
          
          </Col>
      </Row>
  </Container>
  

)
}

export default PR;





 {/* <td className='' style={{border:'1px solid rgb(212, 211, 211)', fontSize:'15px'}}><p className="">{item.name}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)', fontSize:'15px'}}><p className="">{item.email}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)', fontSize:'15px'}}>
                                        {item.status === 'active' ? <b><p style={{color:'green'}}>{item.status}</p></b> :
                                        item.status === 'suspended' ? <b><p style={{color:'red'}}>{item.status}</p></b> :
                                        <p style={{color:'gray'}}>{item.status}</p>}
                                  </td>
                                  <td className='' style={{border: '1px solid rgb(212, 211, 211)', fontSize: '15px'}}>
                                      {item.status === 'active' ?
                                        <Button style={{backgroundColor: 'red', color: 'white'}}>Deactivate</Button> :
                                        item.status === 'suspended' ?
                                          <Button style={{backgroundColor: 'green', color: 'white'}}>Activate</Button> :
                                          <Button style={{backgroundColor: 'gray', color: 'white'}}>Activate</Button>
                                      }
                                  </td> */}