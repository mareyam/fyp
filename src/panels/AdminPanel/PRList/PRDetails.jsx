import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams(); // Access the id parameter from the URL
  const [PR, setPR] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/userlist/')
      .then(response => {
        const PRAgencyResults = response.data.filter(item => item.id === 4);
        setPR(PRAgencyResults);
        console.log("PR agency is", PRAgencyResults);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]); // Include id in the dependency array to re-fetch data when id changes

  if (!PR) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Detail</h1>
      {PR.map(item => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Email: {item.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserDetail;
