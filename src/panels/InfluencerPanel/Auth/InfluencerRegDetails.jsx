import { Checkbox } from '@material-ui/core';
import React,{useState} from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';
import Select, { components } from "react-select";
import DatePicker from 'react-datepicker';
import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';



function InfluencerRegDetails() {
return (

  <Container className="mt-5">
      <Row className="d-lg-mt-5">
        <div className='d-lg-flex d-sm-block' style={{justifyContent:'center', alignItems:"center"}}>
          <Col xs={12} sm={12} md={12} lg={6}>
            <img style={{width: '100%', objectFit:'cover'}}src={authAbstract} />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
          <div className='text-left justify-content-center align-center d-lg-mt-5'><h4 className='text-center'>Welcome to Brand Sense, Ali Zafar</h4>
           <h6 className='text-center'>to get started, tell us about yourself.</h6>

            <form className="needs-validation" noValidate>
            <Col xs={12} sm={12} md={12} lg={6} className='mb-3'>
              <b><label htmlFor="validationTooltip01" style={{textAlign:'left'}}>Full Name</label></b>
                <input type="text" className="form-control" id="validationTooltip01" placeholder="Ali Zafar" name="text" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
                <div className="valid-tooltip">
                  Looks good!
                </div>
              </Col>
              <Col md="4" className="mb-3 ">
                <b><label htmlFor="validationTooltip01" style={{textAlign:'left'}}>Username</label></b>
                {/* <input type="text" className="form-control" id="validationTooltip01" placeholder="Email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}/> */}
                <input type="text" className="form-control" id="validationTooltip01" placeholder="@alizafar" name="text" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
                <div className="valid-tooltip">
                  Looks good!
                </div>
              </Col>
              
              <Col md="4" className="mb-3">
                <b><label htmlFor="validationTooltip01" style={{textAlign:'left'}}>About you</label></b>
                {/* <input type="text" className="form-control" id="validationTooltip01" placeholder="Email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}/> */}
                <input type="text" className="form-control" id="validationTooltip01" placeholder="Signer, actor, songwriter, social worker" name="text" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
                <div className="valid-tooltip">
                  Looks good!
                </div>
              </Col>

              <Col md="4" className="mb-3">
                <b><label>Genre</label></b>
                 <App/>
              </Col>
             
            <div className='justify-content-center align-items-center text-center'>
              <a href="/InfluencerRegDetails2" style={{textDecoration:"none"}}>
              <button type="button" className="btn btn-primary" style={{backgroundColor:'#452c63', width:'200px'}}>Next</button></a></div>
          </form>
        </div>
          </Col>
        </div>
      </Row>
     
  </Container>
)
}

export default InfluencerRegDetails;



const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex "
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} />
      {children}
    </components.Option>
  );
};

const allOptions = [
  { value: "Fashion", label: "Fashion" },
  { value: "Music", label: "Music" },
  { value: "Food", label: "Food" },
  { value: "Health", label: "Health" },
  { value: "Dance", label: "Dance" },
];

function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <div className="App">
      <Select
        defaultValue={[]}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        onChange={(options) => {
          if (Array.isArray(options)) {
            setSelectedOptions(options.map((opt) => opt.value));
          }
        }}
        options={allOptions}
        components={{
          Option: InputOption
        }}
      />
      {/* <pre>{JSON.stringify({ selected: selectedOptions }, null, 2)}</pre> */}
    </div>
  );
}




function Filters() {
    const [gender, setGender] = useState('');
    const [isParent, setIsParent] = useState(false);
    const [childrenCount, setChildrenCount] = useState({ min: 0, max: 10 });
    const [childAge, setChildAge] = useState({ min: 0, max: 25 });
    const [dateOfBirth, setDateOfBirth] = useState(new Date("2014/02/08"));

  

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

   
    const handleAgeChange = (age) => {
      setDateOfBirth((prevState) => {
        return {
          ...prevState,
          max: age.max,
          min: age.min
        }
      })
    }
  


  
    return (
      <div>      
          <div>
            <h4>Gender</h4>
            <GenderCheckbox onGenderChange={handleGenderChange}/>
            {/* <p>{gender}</p> */}
            </div>

            <div>
            <h4>Date of Birth</h4>
            <DateOfBirth onAge={handleAgeChange}/>  
            </div>

            
            <div>
            <h4>Parents</h4>
            <ParentCheckbox onIsParent={handleParentCheckbox} onChildrenCount={handleChildrenCountChange} onChildAge={handleChildAgeChange}/>
            {/* <p> value is {isParent.toString()}</p>
            <p> value is {childrenCount.max.toString()}</p>
            <p> value is {childrenCount.min.toString()}</p>
            <p> value is {childAge.max.toString()}</p>
            <p> value is {childAge.min.toString()}</p> */}
            </div>
       
            
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
  
  function DateOfBirth(props) { 
     const [dateOfBirth, setDateOfBirth] = useState(new Date("2014/02/08"));
  return ( 
    <div>
    <label for="exampleInputEmail1">Select start date</label>
    <DatePicker className='inputNC'
      selected={dateOfBirth}
      onChange={(date) => setDateOfBirth(date)}
      selectsStart
      dateOfBirth={dateOfBirth}/>
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
  
  




