import axios from "axios";
import React, {useState, useEffect} from 'react';
import "./Test.css";
import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';


const Test = () => {
  const INTEREST = ["Fashion", "Music", "Food", "Health", "Gaming", "Dance", "Entertainment", "Family", "Kids"];
  const GENDER_OPTIONS = ["Male", "Female", "Other"];
  const ISPARENT = ["Yes", "No"];
  const childrenAgeRange = ["toddler", "preschooler", "elementary", "teen", "adult"]

  const [showFilter, setShowFilter] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedIsParent, setSelectedIsParent] = useState("");
  const [childrenCount, setChildrenCount] = useState({ min: 1, max: 10 });
  const [followers, setFollowers] = useState({ min: 10, max: 100 });
  const [childrenAge, setChildrenAge] = useState([]);
  const [influencerAge, setInfluencerAge] = useState({ min: 10, max: 100 });
  

  const [influencers, setInfluencers] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/newinfluencers/')
      .then(response => {
        setInfluencers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);



  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  
  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };


  const handleInterestClick = (interest) => {
    setSelectedInterests(interest);
  };

  // const handleInterestClick = (option) => {
  //   if (selectedInterests.includes(option)) {
  //     setSelectedInterests(selectedInterests.filter((item) => item !== option));
  //   } else {
  //     setSelectedInterests([...selectedInterests, option]);
  //   }
  // };

  // const filteredInterest = INTEREST.filter((option) =>
  //   selectedInterests.includes(option)
  // );

  const filteredData = influencers.filter((item) =>
      (selectedGender === "" || item.gender === selectedGender) &&
      (selectedInterests === "" || item.interest === selectedInterests) 
      // (filteredInterest.length === 0 || filteredInterest.some((option) => item.options.includes(option))) 
  );
  console.log(filteredData);

  return (
    <div>
     <div className="header">
        <div>Header</div>
        <div>
          <button onClick={toggleFilter}>Filter</button>
        </div>
      </div>
       <div className={`filter ${showFilter ? "show" : ""}`}>
        <button className="close-btn" onClick={handleCloseFilter}>
          X
        </button>
        <div>
          <h3>Gender</h3>
          {GENDER_OPTIONS.map((option) => (
            <div
              className={`option ${selectedGender === option ? "selected" : ""}`}
              key={option}
              onClick={() => handleGenderSelect(option)}>
              {option}
            </div>
          ))}
        </div>

        <div>
          <h3>Interest</h3>
          {INTEREST.map((option) => (
            <div
              className={`option ${selectedInterests === option ? "selected" : ""}`}
              key={option}
              onClick={() => handleInterestClick(option)}>
              {option}
            </div>
          ))}
        </div>



      
        <div>
          <h3>Influencer Age</h3>
        </div>


        <div>
          Number of followers:<br/>
          
        </div>
     <div>
        <h3>Are you a parent?</h3>
        
      </div>

    
      <div>
        <div>
          <h3>Children Count</h3>
        
        </div>
        
        <div>
          Children age :<br/>
        
      </div>
        
      </div>
        
        </div>
        <div className="content">
        {filteredData.map((item) => (
          <div className="data-item" key={item.name}>
            <div><b>Name: {item.fullname}</b></div>
            <div>Gender: {item.gender}</div>
            <div>Interests: {item.interests}</div>
            <div>IsParent: {item.isparent}</div>
            <div>Children Count: {item.children_count}</div>
            <div>Children Age: {item.children_age}</div>
            <div>followers: {item.followers}</div>
            <div>influencer age: {item.age}</div>
            
            
          </div>
        ))}
      </div>
    </div>
  );}

  const testData = [
    { name: "John", influencerAge: 24, gender: "Male", isparent: 'Yes', numOfKids: 2, kidsAge: ['toddler', 'preschooler'], options: ["Option 1", "Option 2"], followersCount: 10 },
    { name: "Jane", influencerAge: 44, gender: "Female", isparent: 'Yes', numOfKids: 1, kidsAge: ['toddler'], options: ["Option 1", "Option 2"], followersCount: 20 },
    { name: "Bob", influencerAge: 54, gender: "Male", isparent: 'No', numOfKids: 0, kidsAge: [],options: ["Option 2"], followersCount: 30 },
    { name: "Alice", influencerAge: 23, gender: "Female", isparent: 'Yes', numOfKids: 3, kidsAge: ['infant', 'preschooler', 'elementary'],options: ["Option 3", "Option 2"], followersCount: 50 },
    { name: "Tom", influencerAge: 24, gender: "Male", isparent: 'Yes', numOfKids: 2, kidsAge: ['elementary', 'preteen'],options: ["Option 1", "Option 3"], followersCount: 60 },
    { name: "Sara", influencerAge: 24, gender: "Female", isparent: 'No', numOfKids: 0, kidsAge: [],options: ["Option 1", "Option 3"], followersCount: 100 }
  ];

export default Test;



// import axios from "axios";
// import React, {useState, useEffect} from 'react';
// import "./Test.css";
// import 'react-input-range/lib/css/index.css';
// import InputRange from 'react-input-range';


// const Test = () => {
//   const INTEREST = ["Fashion", "Music", "Food", "Health", "Gaming", "Dance", "Entertainment", "Family", "Kids"];
//   const GENDER = ["Male", "Female", "Other"];
//   const ISPARENT = ["Yes", "No"];
//   const CHILD_AGE = ["toddler", "preschooler", "elementary", "teen", "adult"]

  
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedInterest, setSelectedInterest] = useState([]);
//   const [selectedGender, setSelectedGender] = useState([]);
//   const [selectedIsParent, setSelectedIsParent] = useState("");
//   const [childrenAge, setChildrenAge] = useState([]);
//   const [childrenCount, setChildrenCount] = useState({ min: 1, max: 10 });
  

//   const [influencers, setInfluencers] = useState([]);
  

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/newinfluencers/')
//       .then(response => {
//         setInfluencers(response.data);
//         console.log(influencers);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);


//   const toggleFilter = () => {
//     setShowFilter(!showFilter);
//   };


  
//   const handleCloseFilter = () => {
//     setShowFilter(false);
//   };

//   const handleInterestClick = (option) => {
//     if (selectedInterest.includes(option)) {
//       setSelectedInterest(selectedInterest.filter((item) => item !== option));
//     } else {
//       setSelectedInterest([...selectedInterest, option]);
//     }
//   };

//   const handleGenderClick = (option) => {
//     if (selectedGender.includes(option)) {
//       setSelectedGender(selectedGender.filter((item) => item !== option));
//     } else {
//       setSelectedGender([...selectedGender, option]);
//     }
//   };

//   const handleIsParentClick = (isParent) => {
//     setSelectedIsParent(isParent);
//   };


//   const handleChildAgeClick = (option) => {
//     if (childrenAge.includes(option)) {
//       setChildrenAge(childrenAge.filter((item) => item !== option));
//     } else {
//       setChildrenAge([...childrenAge, option]);
//     }
//   };

  
//   const handleChildrenCount = (childrenCount) => {
//     setChildrenCount((prevState) => {
//       return {
//         ...prevState,
//         max: childrenCount.max,
//         min: childrenCount.min,
//       }
//     })
//   };


//   const filteredInterest = INTEREST.filter((option) =>
//     selectedInterest.includes(option)
//   );

//   const filteredGender = GENDER.filter((option) =>
//     selectedGender.includes(option)
//   );
  
//   const filteredChildrenAge = CHILD_AGE.filter((option) =>
//    childrenAge.includes(option)
//   );

//   const filteredData = influencers.filter((item) =>
//       (selectedGender.length === 0 || selectedGender.some((option) => item.gender.includes(option))) &&
//       (filteredInterest.length === 0 || filteredInterest.some((option) => item.interests.includes(option))) &&
//       (selectedIsParent === "" || item.isparent === selectedIsParent) &&
//       (filteredChildrenAge.length === 0 || filteredChildrenAge.some((option) => item.kidsAge.includes(option))) &&
//       (item.children_count >= childrenCount.min && item.children_count <= childrenCount.max) 

//       // (item.followersCount >= followers.min && item.followersCount <= followers.max) &&
//       // (filteredChildrenAge.length === 0 || filteredChildrenAge.some((option) => item.kidsAge.includes(option))) &&
//       // (item.numOfKids >= childrenCount.min && item.numOfKids <= childrenCount.max) &&
//       // (item.influencerAge >= influencerAge.min && item.influencerAge <= influencerAge.max)  
//   );
//   console.log(filteredData);

//   return (
//     <div>
//      <div className="header">
//         <div>Header</div>
//         <div>
//           <button onClick={toggleFilter}>Filter</button>
//         </div>
//       </div>
//        <div className={`filter ${showFilter ? "show" : ""}`}>
//         <button className="close-btn" onClick={handleCloseFilter}>
//           X
//         </button>
//         <div>
//           <h3>Gender</h3>
//           {/* {GENDER.map((option) => (
//             <div
//               className={`option ${selectedGender === option ? "selected" : ""}`}
//               key={option}
//               onClick={() => handleGenderSelect(option)}
//             >
//               {option}
//             </div>
//           ))} */}

//         {GENDER.map((option) => (
//             <div
//               className={`option ${
//                 filteredGender.includes(option) ? "selected" : ""
//               }`}
//               key={option}
//               onClick={() => handleGenderClick(option)}
//             >
//               {option}
//             </div>
//           ))}

//         </div>
//         <div>
//           <h3>Filter Options</h3>
//           {INTEREST.map((option) => (
//             <div
//               className={`option ${
//                 filteredInterest.includes(option) ? "selected" : ""
//               }`}
//               key={option}
//               onClick={() => handleInterestClick(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>

//         <div>
//         <h3>Are you a parent?</h3>
//         {ISPARENT.map((option) => (
//             <div
//               className={`option ${selectedIsParent === option ? "selected" : ""}`}
//               key={option}
//               onClick={() => handleIsParentClick(option)}
//             >{option}
//             </div>
//           ))}
//       </div>

     

//         </div>
//         <div className="content">
//         {filteredData.map((item) => (
//           <div className="data-item" key={item.name}>
//             <div>Name: {item.fullname}</div>
//             <div>Gender: {item.gender}</div>
//             <div>Interest: {item.interests}</div>
//             <div>IsParent: {item.isparent}</div>         
//             <div>children count: {item.children_count}</div>  
//             <div>children age: {item.children_age}</div>  
//           </div>
//         ))}
//       </div>
//     </div>
//   );}


// export default Test;

// import React, { useState } from "react";

// const testData = [
//   { name: "John", gender: "Male", isParent: 'Yes', numOfKids: 2, kidsAge: [4, 6], options: ["Option 1", "Option 2"] },
//   { name: "Jane", gender: "Female", isParent: 'Yes', numOfKids: 1, kidsAge: [3], options: ["Option 1", "Option 2"] },
//   { name: "Bob", gender: "Male", isParent: 'No', numOfKids: 0, kidsAge: [],options: ["Option 2"] },
//   { name: "Alice", gender: "Female", isParent: 'Yes', numOfKids: 3, kidsAge: [2, 5, 8],options: ["Option 3", "Option 2"] },
//   { name: "Tom", gender: "Male", isParent: 'Yes', numOfKids: 2, kidsAge: [7, 9],options: ["Option 1", "Option 3"] },
//   { name: "Sara", gender: "Female", isParent: 'No', numOfKids: 0, kidsAge: [],options: ["Option 1", "Option 3"] }
// ];

// const Test = () => {
//   const [minAge, setMinAge] = useState("");
//   const [maxAge, setMaxAge] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   const handleFilter = () => {
//     const filtered = testData.filter(
//       (item) =>
//         item.kidsAge.some((age) => age >= parseInt(minAge) && age <= parseInt(maxAge))
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="number"
//           placeholder="Minimum age"
//           value={minAge}
//           onChange={(e) => setMinAge(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Maximum age"
//           value={maxAge}
//           onChange={(e) => setMaxAge(e.target.value)}
//         />
//         <button onClick={handleFilter}>Filter</button>
//       </div>
//       <div>
//         {filteredData.map((item) => (
//           <div key={item.name}>
//             <div>Name: {item.name}</div>
//             <div>Children Age: {item.kidsAge.join(", ")}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Test;

// import React, { useState } from "react";
// import "./Test.css";

// const FILTER_OPTIONS = ["Option 1", "Option 2", "Option 3"];
// const GENDER_OPTIONS = ["Male", "Female"];
// const IS_PARENT_OPTIONS = ["Yes", "No"];

// const App = () => {
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedIsParent, setSelectedIsParent] = useState("");

//     const testData = [
//     { name: "John", gender: "Male", isParent: 'yes', numOfKids: 2, kidsAge: [4, 6], options: ["Option 1", "Option 2"] },
//     { name: "Jane", gender: "Female", isParent: 'yes', numOfKids: 1, kidsAge: [3], options: ["Option 1", "Option 2"] },
//     { name: "Bob", gender: "Male", isParent: 'no', numOfKids: 0, kidsAge: [],options: ["Option 2"] },
//     { name: "Alice", gender: "Female", isParent: 'yes', numOfKids: 3, kidsAge: [2, 5, 8],options: ["Option 3", "Option 2"] },
//     { name: "Tom", gender: "Male", isParent: 'yes', numOfKids: 2, kidsAge: [7, 9],options: ["Option 1", "Option 3"] },
//     { name: "Sara", gender: "Female", isParent: 'no', numOfKids: 0, kidsAge: [],options: ["Option 1", "Option 3"] }
//   ];


//   const toggleFilter = () => {
//     setShowFilter(!showFilter);
//   };

//   const handleOptionClick = (option) => {
//     if (selectedOptions.includes(option)) {
//       setSelectedOptions(selectedOptions.filter((item) => item !== option));
//     } else {
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   };

//   const handleGenderSelect = (gender) => {
//     setSelectedGender(gender);
//   };

//   const handleIsParentSelect = (isParent) => {
//     setSelectedIsParent(isParent);
//   };

//   function handleFilter() {
//     const isParentFilteredData = testData.filter(item => {
//       return (
//         item.gender === selectedGender && 
//         (selectedIsParent ? item.isParent : true)
//       );
//     });


//   const handleCloseFilter = () => {
//     setShowFilter(false);
//   };

//   const filteredOptions = FILTER_OPTIONS.filter((option) =>
//     selectedOptions.includes(option)
//   );

//   const filteredData = testData.filter((item) =>
//       (selectedGender === "" || item.gender === selectedGender) &&
//       (filteredOptions.length === 0 ||
//         filteredOptions.some((option) => item.options.includes(option))) &&
//         (selectedIsParent ? item.isParent : true)
        
//   );
//   console.log(filteredData);

//   return (
//     <div className="App">
//       <div className="header">
//         <div>Header</div>
//         <div>
//           <button onClick={toggleFilter}>Filter</button>
//         </div>
//       </div>
//       <div className={`filter ${showFilter ? "show" : ""}`}>
//         <button className="close-btn" onClick={handleCloseFilter}>
//           X
//         </button>
//         <div>
//           <h3>Gender</h3>
//           {GENDER_OPTIONS.map((option) => (
//             <div
//               className={`option ${selectedGender === option ? "selected" : ""}`}
//               key={option}
//               onClick={() => handleGenderSelect(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3>Are you a parent?</h3>
//           {IS_PARENT_OPTIONS.map((option) => (
//             <div
//               className={`option ${selectedIsParent === option ? "selected" : ""} ${
//                 option === "No" && selectedIsParent ? "disabled" : ""
//               }`}
//               key={option}
//               onClick={() => handleIsParentSelect(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//         <div>
//          </div>
//          </div>
//          </div>
//   )}}
// export default App;





// {/* 

// // const FILTER_OPTIONS = ["Option 1", "Option 2", "Option 3"];
// // const GENDER_OPTIONS = ["Male", "Female"];

// // function App() {
// //   const [showFilter, setShowFilter] = useState(false);
// //   const [selectedOptions, setSelectedOptions] = useState([]);
// //   const [selectedGender, setSelectedGender] = useState("");

// //   const toggleFilter = () => {
// //     setShowFilter(!showFilter);
// //   };

// //   const handleOptionClick = (option) => {
// //     if (selectedOptions.includes(option)) {
// //       setSelectedOptions(selectedOptions.filter((item) => item !== option));
// //     } else {
// //       setSelectedOptions([...selectedOptions, option]);
// //     }
// //   };

// //   const handleGenderSelect = (gender) => {
// //     setSelectedGender(gender);
// //   };

// //   const handleCloseFilter = () => {
// //     setShowFilter(false);
// //   };

// //   const filteredOptions = FILTER_OPTIONS.filter((option) =>
// //     selectedOptions.includes(option)
// //   );

// //   const filteredData = testData.filter(
// //     (item) =>
// //       (selectedGender === "" || item.gender === selectedGender) &&
// //       (filteredOptions.length === 0 ||
// //         filteredOptions.some((option) => item.options.includes(option)))
// //   );

// //   return (
// //     <div className="App">
// //       <div className="header">
// //         <div>Header</div>
// //         <div>
// //           <button onClick={toggleFilter}>Filter</button>
// //         </div>
// //       </div>
// //       <div className={`filter ${showFilter ? "show" : ""}`}>
// //         <button className="close-btn" onClick={handleCloseFilter}>
// //           X
// //         </button>
// //         <div>
// //           <h3>Gender</h3>
// //           {GENDER_OPTIONS.map((option) => (
// //             <div
// //               className={`option ${selectedGender === option ? "selected" : ""}`}
// //               key={option}
// //               onClick={() => handleGenderSelect(option)}
// //             >
// //               {option}
// //             </div>
// //           ))}
// //         </div>
// //         <div>
// //           <h3>Filter Options</h3>
// //           {FILTER_OPTIONS.map((option) => (
// //             <div
// //               className={`option ${
// //                 filteredOptions.includes(option) ? "selected" : ""
// //               }`}
// //               key={option}
// //               onClick={() => handleOptionClick(option)}
// //             >
// //               {option}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       <div className="content">
// //         {filteredData.map((item) => (
// //           <div className="data-item" key={item.name}>
// //             <div>Name: {item.name}</div>
// //             <div>Gender: {item.gender}</div>
// //             <div>Options: {item.options.join(", ")}</div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
