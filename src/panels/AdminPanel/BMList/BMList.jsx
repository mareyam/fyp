import axios from "axios";
import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';

const BMPagintation = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
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


const BMList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [BM, setBM] = useState([]);

  

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/bmlogin/')
        .then(response => {
          setBM(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = BM.slice(indexOfFirstItem, indexOfLastItem);

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
    if (status === 'suspended') {
      bgColor = 'green';
      text = 'Activate';
    } else {
      bgColor = 'red';
      text = 'Deactivate';
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
      bgColor = 'red';
      text = 'Deactivate';
    }
  };


return (
  <Container className='mt-1'>
     <h4 className='header4AD text-left text-sm-left'>Admin DashBoard</h4>
      <Row>
          <Col xs={12} sm={12} md={12} lg={12} className='d-flex'>
            <h5>Brand Managers</h5>     
          </Col>
          <Col>
          <div className="tablee">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                    <th className="">Name</th>
                    <th className="" scope="col">Email</th>
                    <th className="" scope="col">Brand Name</th>
                    <th className="" scope="col">Joined</th>
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
                                  <TableCell>{item.brandName}</TableCell>
                                  <TableCell>{item.created}</TableCell>
                                   <TableCell><Status status='active'/></TableCell>
                                   {/* status={item.status} */}
                                  <TableCell><ActionButton status={item.status}   onClick={() => handleButtonState(item.status)}/></TableCell>                                  

                              </tr> )})}                                 
                                 
                      <BMPagintation
                          itemsPerPage={itemsPerPage}
                          totalItems={BM.length}
                          paginate={paginate}/>
                </tbody>      
          </table>
          </div>
          
          
          </Col>
      </Row>
  </Container>
  

)
}

export default BMList;





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



                                  // const handleSearch = (event) => {
                                  //   const searchText = event.target.value;
                                  //   setSearchValue(searchText);
                                  //   let results = BM;
                                  //   if (searchText) {
                                  //     results = BM.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
                                  //   }
                                  //   setBM(results);
                                  // }