import axios from "axios";
import React, {useState, useEffect} from 'react';
import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import Accordion from 'react-bootstrap/Accordion';

function Filters() {
    // const [gender, setGender] = useState('');
    const [isParent, setIsParent] = useState(false);
    const [childrenCount, setChildrenCount] = useState({ min: 0, max: 10 });
    const [childAge, setChildAge] = useState({ min: 0, max: 25 });
    const [followers, setFollowers] = useState({ min: 100000, max: 300000 });
    const [age, setAge] = useState({ min: 15, max: 100 });

    const [gender, setGender] = useState([]);
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/filters/')
        .then(response => {
          setAge(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);


    const handleGenderChange = (gender) => {
      setGender(gender);
    };
  
    const handleParentCheckbox = (isParent) => {
      setIsParent(isParent);
    }

    const handleChildrenCountChange = (childrenCount) => {
      setChildAge((prevState) => {
        return {
          ...prevState,
          max: childrenCount.max,
          min: childrenCount.min,
        };
      });
    };

    
    const handleChildAgeChange = (childAge) => {
      setChildrenCount((prevState) => {
        return {
          ...prevState,
          max: childAge.max,
          min: childAge.min,
        }
      })
    };

    const handleFollowersCountChange = (followers) => {
      setFollowers((prevState) => {
        return {
          ...prevState,
          max: followers.max,
          min: followers.min,
        }
      })
    };

    const handleAgeChange = (age) => {
      setAge((prevState) => {
        return {
          ...prevState,
          max: age.max,
          min: age.min
        }
      })
    }
  


  
    return (
      <div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header> Gender</Accordion.Header>
          <Accordion.Body>
            <GenderCheckbox onGenderChange={handleGenderChange}/>
            {/* <p>{gender}</p> */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Parents?</Accordion.Header>
          <Accordion.Body>
            <ParentCheckbox onIsParent={handleParentCheckbox} onChildrenCount={handleChildrenCountChange} onChildAge={handleChildAgeChange}/>
            {/* <p> value is {isParent.toString()}</p>
            <p> value is {childrenCount.max.toString()}</p>
            <p> value is {childrenCount.min.toString()}</p>
            <p> value is {childAge.max.toString()}</p>
            <p> value is {childAge.min.toString()}</p> */}
            

          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Follower Count</Accordion.Header>
          <Accordion.Body>
            <FollowerCount onFollowersCount={handleFollowersCountChange}/>  
            {/* <p> value is {followers.max.toString()}</p>
            <p> value is {followers.min.toString()}</p> */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Age</Accordion.Header>
          <Accordion.Body>
            <Age onAge={handleAgeChange}/>  
            {/* <p> value is {age.max.toString()}</p>
            <p> value is {age.min.toString()}</p> */}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'170px'}}>Filter Items</button>
      </div>
    );
  
  }
  
  
  function GenderCheckbox(props) {
    const [gender, setGender] = useState('');
  
    function handleGenderCheckbox(e) {
      const newGender = e.target.value;
      setGender(newGender);
      props.onGenderChange(newGender);
    }
  
  
    return (
      <div>
        <label>
          <input
            type="checkbox"
            value="male"
            checked={gender === 'male'}
            onChange={handleGenderCheckbox}
          />
          Male
        </label><br/>
        <label>
          <input
            type="checkbox"
            value="female"
            checked={gender === 'female'}
            onChange={handleGenderCheckbox}
          />
          Female
        </label>
      </div>
    );
  }
  
  function ParentCheckbox(props) {
    const [isParent, setIsParent] = useState(false);
    const [childrenCount, setChildrenCount] = useState({ min: 0, max: 10 });
    const [childAge, setChildAge] = useState({ min: 0, max: 25 });
    const handleParentCheckbox = (e) => {
      const value = e.target.checked;
      setIsParent(value);
      props.onIsParent(value);
    }
  
     const handleChildrenCount = (childrenCount) => {
      if(childrenCount.min < 0)
      childrenCount.min = 0;
      if(childrenCount.max > 10)
      childrenCount.max = 10;
      setChildrenCount(childrenCount);
      props.onChildrenCount(childrenCount);
    }

     const handleChildAge = (childAge) => {
       if(childAge.min < 0)
       childAge.min = 0;
       if(childAge.max > 10)
       childAge.max = 10;
       setChildAge(childAge);
       props.onChildAge(childAge);
    };
    
    return (
      <div>
        <div>
          <label> 
            <input type='checkbox' checked={isParent} onChange={handleParentCheckbox} />
            Are you a parent?
          </label>
        </div>
  { isParent? (
    <div>
        <div>
          <div>How many children do you have?</div>
          <div>
            <InputRange
              minValue={0}
              maxValue={10}
              value={childrenCount}
              onChange={handleChildrenCount}
              draggableTrack
              allowSameValues
              />
          </div>
        </div>
        <div>
          <div>Children age group?</div>
          <div>
              <InputRange
              minValue={0}
              maxValue={25}
              value={childAge}
              onChange={handleChildAge}
              draggableTrack
              allowSameValues
              />
          </div>
        </div>
    </div>
  ) : null }
  
      </div>
    )
  }
  
  function Age(props) { 
    const [age, setAge] = useState({ min: 15, max: 100 });

    const handleAge = (age) => {
      if(age.min < 15)
      age.min = 15;
      if(age.max > 100)
      age.max = 100;
      setAge(age);
      props.onAge(age);
    };

  return ( 
    <div>
      Number of age:<br/>
      <InputRange
      minValue={15}
      maxValue={100}
      value={age}
      onChange={handleAge}
      draggableTrack
      allowSameValues
      />
    </div>
  )
  }
  
  function FollowerCount(props) { 
    const [followers, setFollowers] = useState({ min: 100000, max: 300000 });
  
    const handleFollowers = (followers) => {
      if(followers.min < 100000)
      followers.min = 100000;
      if(followers.max > 300000)
      followers.max = 300000;
      setFollowers(followers);
      props.onFollowersCount(followers);
    };

  return ( 
    <div>
      Number of followers:<br/>
      <InputRange
      minValue={100000}
      maxValue={300000}
      value={followers}
      onChange={handleFollowers}
      draggableTrack
      allowSameValues
      />
    </div>
  )
  }
  
  
  export default Filters;