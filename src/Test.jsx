import axios from "axios";
import React, {useState, useEffect} from 'react';
import "./Test.css";
import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';


const Test = () => {
  const FILTER_OPTIONS = ["Option 1", "Option 2", "Option 3"];
  const GENDER_OPTIONS = ["Male", "Female"];
  const isParent = ["Yes", "No"];
  const childrenAgeRange = ["toddler", "preschooler", "elementary", "teen", "adult"]

  const [showFilter, setShowFilter] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
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

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleIsParentSelect = (isParent) => {
    setSelectedIsParent(isParent);
    if (isParent === "No") {
      setChildrenCount("");
      setChildrenAge("");
    }
  };

  
  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleChildAgeClick = (option) => {
    if (childrenAge.includes(option)) {
      setChildrenAge(childrenAge.filter((item) => item !== option));
    } else {
      setChildrenAge([...childrenAge, option]);
    }
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

  const handleChildrenCount = (childrenCount) => {
    setChildrenCount((prevState) => {
      return {
        ...prevState,
        max: childrenCount.max,
        min: childrenCount.min,
      }
    })
  };

  const handleInfluencerAge = (influencerAge) => {
    setInfluencerAge((prevState) => {
      return {
        ...prevState,
        max: influencerAge.max,
        min: influencerAge.min,
      }
    })
  };

  const filteredOptions = FILTER_OPTIONS.filter((option) =>
    selectedOptions.includes(option)
  );

  const filteredChildrenAge = childrenAgeRange.filter((option) =>
  childrenAge.includes(option)
);

  

  const filteredData = influencers.filter((item) =>
      (selectedGender === "" || item.gender === selectedGender) &&
      (selectedIsParent === "" || item.isparent === selectedIsParent) &&
      (item.followers >= followers.min && item.followers <= followers.max) &&
      (filteredChildrenAge.length === 0 || filteredChildrenAge.some((option) => item.children_age.includes(option))) &&
      // (item.children_count >= childrenCount.min && item.children_count <= childrenCount.max)
      (item.age >= influencerAge.min && item.age <= influencerAge.max)  
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
              onClick={() => handleGenderSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
        <div>
          <h3>Filter Options</h3>
          {FILTER_OPTIONS.map((option) => (
            <div
              className={`option ${
                filteredOptions.includes(option) ? "selected" : ""
              }`}
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>

        <div>
          <h3>Influencer Age</h3>
              <InputRange
              minValue={10}
              maxValue={100}
              value={influencerAge}
              onChange={handleInfluencerAge}
              draggableTrack
              allowSameValues
              />
        </div>
           

        <div>
          Number of followers:<br/>
          <InputRange
          minValue={10}
          maxValue={100}
          value={followers}
          onChange={handleFollowersCountChange}
          draggableTrack
          allowSameValues
          />
        </div>


        <div>
        <h3>Are you a parent?</h3>
        {isParent.map((option) => (
            <div
              className={`option ${selectedIsParent === option ? "selected" : ""}`}
              key={option}
              onClick={() => handleIsParentSelect(option)}
            >{option}
            </div>
          ))}
      </div>

     

     {selectedIsParent === "Yes" && ( 
      <div>
        <div>
          <h3>Children Count</h3>
              <InputRange
              minValue={1}
              maxValue={10}
              value={childrenCount}
              onChange={handleChildrenCount}
              draggableTrack
              allowSameValues
              />
        </div>
        <div>
          Children age :<br/>
          {childrenAgeRange.map((option) => (
            <div
              className={`option ${
                filteredChildrenAge.includes(option) ? "selected" : ""
              }`}
              key={option}
              onClick={() => handleChildAgeClick(option)}
            >
              {option}
            </div>
          ))}
      </div>
      </div> 
           )} 
        
        </div>
        <div className="content">
        {filteredData.map((item) => (
          <div className="data-item" key={item.fullname}>
            <b><div>Name: {item.fullname}</div></b>
            <div>Gender: {item.gender}</div>
            <div>Options: {item.options}</div>
            <div>IsParent: {item.isparent}</div>
            <div>Children Count: {item.children_count}</div>
            <div>Children Age: {item.children_age}</div>
            <div>followersssssssss: {item.followers}</div>
            <div>influencer age: {item.age}</div>
            
            
          </div>
        ))}
      </div>
    </div>
  );}

  const testData = [
    { fullname: "John", age: 24, gender: "Male", isparent: "Yes", children_count: 2, children_age: ['toddler', 'preschooler'], options: ["Option 1", "Option 2"], followers: 10 },
    { fullname: "Jane", age: 44, gender: "Female", isparent: "Yes", children_count: 1, children_age: ['toddler'], options: ["Option 1", "Option 2"], followers: 20 },
    { fullname: "Bob", age: 54, gender: "Male", isparent: "No", children_count: 0, children_age: [],options: ["Option 2"], followers: 30 },
    { fullname: "Alice", age: 23, gender: "Female", isparent: "Yes", children_count: 3, children_age: ['infant', 'preschooler', 'elementary'],options: ["Option 3", "Option 2"], followers: 50 },
    { fullname: "Tom", age: 24, gender: "Male", isparent: "Yes", children_count: 2, children_age: ['elementary', 'preteen'],options: ["Option 1", "Option 3"], followers: 60 },
    { fullname: "Sara", age: 24, gender: "Female", isparent: "No", children_count: 0, children_age: [],options: ["Option 1", "Option 3"], followers: 100 }
  ];

export default Test;
// import React, { useState } from "react";
// import "./Test.css";
// import 'react-input-range/lib/css/index.css';
// import InputRange from 'react-input-range';


// const Test = () => {
//   const FILTER_OPTIONS = ["Option 1", "Option 2", "Option 3"];
//   const GENDER_OPTIONS = ["Male", "Female"];
//   const isParent = ["Yes", "No"];
//   const childrenAgeRange = ["toddler", "preschooler", "elementary", "teen", "adult"]

//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedIsParent, setSelectedIsParent] = useState("");
//   const [childrenCount, setChildrenCount] = useState({ min: 1, max: 10 });
//   const [followers, setFollowers] = useState({ min: 10, max: 100 });
//   const [childrenAge, setChildrenAge] = useState([]);
//   const [influencerAge, setInfluencerAge] = useState({ min: 10, max: 100 });
  

    


//   const toggleFilter = () => {
//     setShowFilter(!showFilter);
//   };

//   const handleGenderSelect = (gender) => {
//     setSelectedGender(gender);
//   };

//   const handleIsParentSelect = (isParent) => {
//     setSelectedIsParent(isParent);
//     if (isParent === "No") {
//       setChildrenCount("");
//       setChildrenAge("");
//     }
//   };

  
//   const handleCloseFilter = () => {
//     setShowFilter(false);
//   };

//   const handleOptionClick = (option) => {
//     if (selectedOptions.includes(option)) {
//       setSelectedOptions(selectedOptions.filter((item) => item !== option));
//     } else {
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   };

//   const handleChildAgeClick = (option) => {
//     if (childrenAge.includes(option)) {
//       setChildrenAge(childrenAge.filter((item) => item !== option));
//     } else {
//       setChildrenAge([...childrenAge, option]);
//     }
//   };


//   const handleFollowersCountChange = (followers) => {
//     setFollowers((prevState) => {
//       return {
//         ...prevState,
//         max: followers.max,
//         min: followers.min,
//       }
//     })
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

//   const handleInfluencerAge = (influencerAge) => {
//     setInfluencerAge((prevState) => {
//       return {
//         ...prevState,
//         max: influencerAge.max,
//         min: influencerAge.min,
//       }
//     })
//   };

//   const filteredOptions = FILTER_OPTIONS.filter((option) =>
//     selectedOptions.includes(option)
//   );

//   const filteredChildrenAge = childrenAgeRange.filter((option) =>
//   childrenAge.includes(option)
// );

  

//   const filteredData = testData.filter((item) =>
//       (selectedGender === "" || item.gender === selectedGender) &&
//       (filteredOptions.length === 0 || filteredOptions.some((option) => item.options.includes(option))) &&
//       (selectedIsParent === "" || item.isParent === selectedIsParent) &&
//       (item.followersCount >= followers.min && item.followersCount <= followers.max) &&
//       (filteredChildrenAge.length === 0 || filteredChildrenAge.some((option) => item.kidsAge.includes(option))) &&
//       (item.numOfKids >= childrenCount.min && item.numOfKids <= childrenCount.max) &&
//       (item.influencerAge >= influencerAge.min && item.influencerAge <= influencerAge.max)  
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
//           <h3>Filter Options</h3>
//           {FILTER_OPTIONS.map((option) => (
//             <div
//               className={`option ${
//                 filteredOptions.includes(option) ? "selected" : ""
//               }`}
//               key={option}
//               onClick={() => handleOptionClick(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>

//         <div>
//           <h3>Influencer Age</h3>
//               <InputRange
//               minValue={10}
//               maxValue={100}
//               value={influencerAge}
//               onChange={handleInfluencerAge}
//               draggableTrack
//               allowSameValues
//               />
//         </div>


//         <div>
//           Number of followers:<br/>
//           <InputRange
//           minValue={10}
//           maxValue={100}
//           value={followers}
//           onChange={handleFollowersCountChange}
//           draggableTrack
//           allowSameValues
//           />
//         </div>


//         <div>
//         <h3>Are you a parent?</h3>
//         {isParent.map((option) => (
//             <div
//               className={`option ${selectedIsParent === option ? "selected" : ""}`}
//               key={option}
//               onClick={() => handleIsParentSelect(option)}
//             >{option}
//             </div>
//           ))}
//       </div>

     

//     {/* {selectedIsParent === "Yes" && ( */}
//       <div>
//         <div>
//           <h3>Children Count</h3>
//               <InputRange
//               minValue={1}
//               maxValue={10}
//               value={childrenCount}
//               onChange={handleChildrenCount}
//               draggableTrack
//               allowSameValues
//               />
//         </div>
//         <div>
//         <div>
//           Children age :<br/>
//           {childrenAgeRange.map((option) => (
//             <div
//               className={`option ${
//                 filteredChildrenAge.includes(option) ? "selected" : ""
//               }`}
//               key={option}
//               onClick={() => handleChildAgeClick(option)}
//             >
//               {option}
//             </div>
//           ))}
//       </div>
//         </div>
//       </div>
//           {/* )}
//         */}
//         </div>
//         <div className="content">
//         {filteredData.map((item) => (
//           <div className="data-item" key={item.name}>
//             <div>Name: {item.name}</div>
//             <div>Gender: {item.gender}</div>
//             <div>Options: {item.options.join(", ")}</div>
//             <b><div>IsParent: {item.isParent}</div></b>
//             <div>Children Count: {item.numOfKids}</div>
//             <div>Children Age: {item.kidsAge.join(", ")}</div>
//             <div>followersssssssss: {item.followersCount}</div>
//             <div>influencer age: {item.influencerAge}</div>
            
            
//           </div>
//         ))}
//       </div>
//     </div>
//   );}

//   const testData = [
//     { name: "John", influencerAge: 24, gender: "Male", isParent: "Yes", numOfKids: 2, kidsAge: ['toddler', 'preschooler'], options: ["Option 1", "Option 2"], followersCount: 10 },
//     { name: "Jane", influencerAge: 44, gender: "Female", isParent: "Yes", numOfKids: 1, kidsAge: ['toddler'], options: ["Option 1", "Option 2"], followersCount: 20 },
//     { name: "Bob", influencerAge: 54, gender: "Male", isParent: "No", numOfKids: 0, kidsAge: [],options: ["Option 2"], followersCount: 30 },
//     { name: "Alice", influencerAge: 23, gender: "Female", isParent: "Yes", numOfKids: 3, kidsAge: ['infant', 'preschooler', 'elementary'],options: ["Option 3", "Option 2"], followersCount: 50 },
//     { name: "Tom", influencerAge: 24, gender: "Male", isParent: "Yes", numOfKids: 2, kidsAge: ['elementary', 'preteen'],options: ["Option 1", "Option 3"], followersCount: 60 },
//     { name: "Sara", influencerAge: 24, gender: "Female", isParent: "No", numOfKids: 0, kidsAge: [],options: ["Option 1", "Option 3"], followersCount: 100 }
//   ];

// export default Test;


// import axios from "axios"
// import React, {useEffect, useState} from 'react';
// import './Style/BrandManagerPanel/NewCampaigns/newCampaigns.css'
// import { Container, Row, Col, Button } from 'react-bootstrap';

// import { Fragment } from 'react';
// import { Listbox, Transition } from '@headlessui/react';
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

// import './Test.css';
// const people = [
//   { name: 'Wade Cooper', username: 'wadecooper', id: 1 },
//   { name: 'Arlene Mccoy', username: 'amccoy', id: 2 },
//   { name: 'Devon Webb', username: 'dwebb', id: 3 },
//   { name: 'Tom Cook', username: 'tcook', id: 4 },
//   { name: 'Tanya Fox', username: 'tfox', id: 5 },
//   { name: 'Hellen Schmidt', username: 'hschmidt', id: 6 },
// ];

// export default function Example() {
//   const [selected, setSelected] = useState(people[0]);

//   return (
//     <div className="listbox-container">
//       <Listbox value={selected} onChange={setSelected}>
//         <div className="listbox-wrapper">
//           <Listbox.Button className="listbox-button" style={{ backgroundColor: 'white' }}>
//             <span>{selected.name}</span>
//           </Listbox.Button>
//           <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
//             <Listbox.Options className="listbox-options">
//               {people.map((person, personIdx) => (
//                 <Listbox.Option
//                   key={personIdx}
//                   className={`listbox-option ${selected.name === person.name ? 'listbox-option--selected' : ''}`}
//                   value={person}
//                 >
//                   {({ selected }) => (
//                     <div className="listbox-option-text">
//                       <span>{person.name}</span>
//                       {selected && (
//                         <>
//                           <span> ({person.username})</span>
//                           <span> [ID: {person.id}]</span>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </Transition>
//         </div>
//       </Listbox>
//     </div>
//   );
// }

// const people = [
//   { name: 'Wade Cooper' },
//   { name: 'Arlene Mccoy' },
//   { name: 'Devon Webb' },
//   { name: 'Tom Cook' },
//   { name: 'Tanya Fox' },
//   { name: 'Hellen Schmidt' },
// ];

// export default function Example() {
//   const [selected, setSelected] = useState(people[0]);

//   return (
//     <div className="listbox-container">
//       <Listbox value={selected} onChange={setSelected} >
//         <div className="listbox-wrapper">
//           <Listbox.Button className="listbox-button" style={{backgroundColor:'white'}}>
//             <span>{selected.name}</span>
//             {/* <span className="listbox-icon">
//               <ChevronUpDownIcon aria-hidden="true" />
//             </span> */}
//           </Listbox.Button>
//           <Transition
//             as={Fragment}
//             leave="transition ease-in duration-100"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Listbox.Options className="listbox-options">
//               {people.map((person, personIdx) => (
//                 <Listbox.Option
//                   key={personIdx}
//                   className={`listbox-option ${selected.name === person.name ? 'listbox-option--selected' : ''}`}
//                   value={person}
//                 >
//                   {({ selected }) => (
//                     <span className={`listbox-option-text ${selected ? 'listbox-option-text--selected' : ''}`}>
//                       {person.name}
//                     </span>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </Transition>
//         </div>
//       </Listbox>
//     </div>
//   );
// }

// const people = [
//   { name: 'Wade Cooper' },
//   { name: 'Arlene Mccoy' },
//   { name: 'Devon Webb' },
//   { name: 'Tom Cook' },
//   { name: 'Tanya Fox' },
//   { name: 'Hellen Schmidt' },
// ];

// export default function Example() {
//   const [selected, setSelected] = useState(people[0]);

//   return (
//     <div className="">
//       <Listbox value={selected} onChange={setSelected} >
//         <div className="listbox  mt-1 " >
//           <Listbox.Button className="listbox-button">
//             <span className="listbox-button:focus">{selected.name}</span>
//             <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//               <ChevronUpDownIcon
//                 className="listbox-button:focus .chevron-icon"
//                 aria-hidden="true"
//               />
//             </span>
//           </Listbox.Button>
//           <Transition
//             as={Fragment}
//             leave="transition ease-in duration-100"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Listbox.Options className="listbox-options"  style={{height: '100px', overflow:'scroll', border:'2px solid red'}}>
//               {people.map((person, personIdx) => (
//                 <Listbox.Option
//                   key={personIdx}
//                   className={`listbox-option ${
//                     selected.name === person.name ? '.listbox-option:hover.listbox-option:focus' : 'text-gray-900'
//                   }`}
//                   value={person}
//                 >
//                   {({ selected }) => (
//                     <>
//                       <span
//                         className={`block truncate ${
//                           selected ? '.listbox-option[selected]' : '.listbox-option[selected]'
//                         }`}
//                       >
//                         {person.name}
//                       </span>
                     
//                     </>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </Transition>
//         </div>
//       </Listbox>
//     </div>
//   );
// }



// import { Fragment } from 'react'
// import { Listbox, Transition } from '@headlessui/react'
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

// const people = [
//   { name: 'Wade Cooper' },
//   { name: 'Arlene Mccoy' },
//   { name: 'Devon Webb' },
//   { name: 'Tom Cook' },
//   { name: 'Tanya Fox' },
//   { name: 'Hellen Schmidt' },
// ]

// export default function Example() {
//   const [selected, setSelected] = useState(people[0])

//   return (
//     <div className="fixed top-16 w-72">
//       <Listbox value={selected} onChange={setSelected}>
//         <div className="relative mt-1">
//           <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
//             <span className="block truncate">{selected.name}</span>
//             <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//               <ChevronUpDownIcon
//                 className="h-5 w-5 text-gray-400"
//                 aria-hidden="true"
//               />
//             </span>
//           </Listbox.Button>
//           <Transition
//             as={Fragment}
//             leave="transition ease-in duration-100"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//               {people.map((person, personIdx) => (
//                 <Listbox.Option
//                   key={personIdx}
//                   className={({ active }) =>
//                     `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                       active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
//                     }`
//                   }
//                   value={person}
//                 >
//                   {({ selected }) => (
//                     <>
//                       <span
//                         className={`block truncate ${
//                           selected ? 'font-medium' : 'font-normal'
//                         }`}
//                       >
//                         {person.name}
//                       </span>
//                       {selected ? (
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                         </span>
//                       ) : null}
//                     </>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </Transition>
//         </div>
//       </Listbox>
//     </div>
//   )
// }


// function SearchBar() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [selectedResult, setSelectedResult] = useState(null);
//   const [influencers, setInfluencers] = useState([]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/influencers/')
//       .then(response => {
//         setInfluencers(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);


//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//     const filteredResults = influencers.filter((result) =>
//       result.influencer_full_name.toLowerCase().includes(event.target.value.toLowerCase())
//     );
//     setFilteredResults(filteredResults);
//     console.log(filteredResults);
//   };

//   const handleResultClick = (result) => {
//     setSelectedResult(result);
//   };

//  return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by name..."
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
      
//       {searchTerm === "" ? (
//         <div style={{ maxHeight: '100px', overflow: 'auto', border:'2px solid green' }}>
//           <ul>
//             {influencers.map((result) => (
//               <li key={result.id} onClick={() => handleResultClick(result)}>
//                 {result.influencer_full_name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (

//         <div style={{ maxHeight: '100px', overflow: 'auto', border:'2px solid red' }}>
//         <ul>
//           {filteredResults.map((result) => (
//             <li key={result.id} onClick={() => handleResultClick(result)}>
//               {result.influencer_full_name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     )}

//       {selectedResult && (
//         <div>
//           <Col xs={11} sm={11} md={5} lg={5} className="mt-5">
//          <div style={{border: '1px solid rgb(212, 211, 211)'}}>
//            <Card style={{ height: "100%", width:"100%"}}>
//              <Card.Body className="">
//                <div style={{textAlign:'center', marginTop: '-1%'}}>
//                  <img style={{borderRadius: '50%', height: '70px', width: '75px'}} src="https://media.gettyimages.com/id/958513664/photo/mahira-khan-attends-the-screening-of-blackkklansman-during-the-71st-annual-cannes-film.jpg?s=612x612&w=gi&k=20&c=hy5zGUyPkyl5gxBh2KqryWf4UIhiv0Lt9bv3z0MiWLA="/>
//                  <h6 style={{fontSize:'14px'}}>{selectedResult.influencer_full_name}</h6>
//                  <p style={{fontSize: '11px', marginTop:'-4px'}}>@{selectedResult.influencer_username}</p>
//                  <p style={{marginTop: '-11px', fontSize:'12px'}}>{selectedResult.budget}</p>
//                </div>
//                <Card.Text className="" style={{ fontFamily: 'Oswald' }}>
     
//                <div className="otherDetails d-block">
//                 <h5 style={{fontSize:'15px'}}><b>Details:</b></h5>
//                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
//                    <SellOutlinedIcon  />
//                    <p className="m-0 ms-2">Fashion</p>
//                  </div>
//                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
//                    <WcOutlinedIcon />
//                    <p className="m-0 ms-2">Female</p>
//                  </div>
//                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
//                    <PaidOutlinedIcon />
//                    <p className="m-0 ms-2">Rs.100k</p>
//                  </div>
//                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
//                    <ChildCareIcon />
//                    <p className="m-0 ms-2">Parent of x kids</p>
//                  </div>
//                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
//                    <NumbersIcon/>
//                    <p className="m-0 ms-2">Age group</p>
//                  </div>
//               </div>
//                <hr/>
//                <div style={{marginTop: '-10px', fontSize:'13px'}}> 
//                  <input type='checkbox'/><label>Post 25,000</label><br/>
//                  <input type='checkbox'/><label>Story 25,000</label>
//                </div>
//                  <div className='text-center' style={{fontSize:'14px', marginBottom: '-5%'}}>
//                    <b><p>Engagememt rate 78%</p>
//                    <p style={{marginTop:'-15px'}}>Amount 90k</p></b>
//                  </div>
//                </Card.Text>
//              </Card.Body>
//            </Card>
//          </div>
//          </Col>


//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchBar;


//25.4
// function SearchBar() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [selectedResult, setSelectedResult] = useState(null);

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//     const filteredResults = data.filter((result) =>
//       result.name.toLowerCase().includes(event.target.value.toLowerCase())
//     );
//     setFilteredResults(filteredResults);
//     console.log(filteredResults);
//   };

//   const handleResultClick = (result) => {
//     setSelectedResult(result);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by name..."
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
     
//         {filteredResults.map((result) => (
         

//           <div key={result.id} onClick={() => handleResultClick(result)}>
//                <p>{result.name}</p>
//                 {selectedResult && (
      //    <Col xs={11} sm={11} md={5} lg={5} className="mt-5">
      //    <div style={{border: '1px solid rgb(212, 211, 211)'}}>
      //      <Card style={{ height: "100%", width:"100%"}}>
      //        <Card.Body className="">
      //          <div style={{textAlign:'center', marginTop: '-1%'}}>
      //            <img style={{borderRadius: '50%', height: '70px', width: '75px'}} src="https://media.gettyimages.com/id/958513664/photo/mahira-khan-attends-the-screening-of-blackkklansman-during-the-71st-annual-cannes-film.jpg?s=612x612&w=gi&k=20&c=hy5zGUyPkyl5gxBh2KqryWf4UIhiv0Lt9bv3z0MiWLA="/>
      //            <h6 style={{fontSize:'14px'}}>Mahira Khan</h6>
      //            <p style={{fontSize: '11px', marginTop:'-4px'}}>@mahirakhan</p>
      //            <p style={{marginTop: '-11px', fontSize:'12px'}}>9.7K Followers</p>
      //          </div>
      //          <Card.Text className="" style={{ fontFamily: 'Oswald' }}>
     
      //          <div className="otherDetails d-block">
      //           <h5 style={{fontSize:'15px'}}><b>Details:</b></h5>
      //            <div style={{fontSize:'13px'}} className="d-flex align-items-center">
      //              <SellOutlinedIcon  />
      //              <p className="m-0 ms-2">Fashion</p>
      //            </div>
      //            <div style={{fontSize:'13px'}} className="d-flex align-items-center">
      //              <WcOutlinedIcon />
      //              <p className="m-0 ms-2">Female</p>
      //            </div>
      //            <div style={{fontSize:'13px'}} className="d-flex align-items-center">
      //              <PaidOutlinedIcon />
      //              <p className="m-0 ms-2">Rs.100k</p>
      //            </div>
      //            <div style={{fontSize:'13px'}} className="d-flex align-items-center">
      //              <ChildCareIcon />
      //              <p className="m-0 ms-2">Parent of x kids</p>
      //            </div>
      //            <div style={{fontSize:'13px'}} className="d-flex align-items-center">
      //              <NumbersIcon/>
      //              <p className="m-0 ms-2">Age group</p>
      //            </div>
      //         </div>
      //          <hr/>
      //          <div style={{marginTop: '-10px', fontSize:'13px'}}> 
      //            <input type='checkbox'/><label>Post 25,000</label><br/>
      //            <input type='checkbox'/><label>Story 25,000</label>
      //          </div>
      //            <div className='text-center' style={{fontSize:'14px', marginBottom: '-5%'}}>
      //              <b><p>Engagememt rate 78%</p>
      //              <p style={{marginTop:'-15px'}}>Amount 90k</p></b>
      //            </div>
      //          </Card.Text>
      //        </Card.Body>
      //      </Card>
      //    </div>
      //    </Col>
      // )}
//           </div>   
//         ))}

//         </div>

//   );
// }

// export default SearchBar;

// const SearchBar = ({ data }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleChange = event => {
//     const { value } = event.target;
//     setSearchTerm(value);
//     const results = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
//     setSearchResults(results);
//   };

//   const handleClick = item => {
//     // Display the result
//     console.log(item);
//   };

//   return (
//     <div>
//       <input type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} />
//       <ul>
//         {searchResults.map(item => (
//           <li key={item.id} onClick={() => handleClick(item)}>
//             {item.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SearchBar;

// function InfluencerList() {
//   const [campaignName, setCampaignName] = useState('');
//   const [influencers, setInfluencers] = useState([]);
//   const [selectedInfluencers, setSelectedInfluencers] = useState([]);
//   const [budget, setBudget] = useState(0);
//   const [campaignType, setCampaignType] = useState('');
//   const [date, setDate] = useState('');
  
  
  
 
//    useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);




//   const handleCampaignNameChange = (event) => {
//     setCampaignName(event.target.value);
//   }

  
//   const handleCampaignBudgetChange = (event) => {
//     setBudget(event.target.value);
//   }

//   const handleDate = (event) => {
//     setDate(event.target.value);
//   }

//   const handleCampaignType = (event) => {
//     setCampaignType(event.target.value);
//   }

//    const handleCheckboxChange = (event, influencer) => {
//      if (event.target.checked) {
//        // Add user to selectedUsers list if checkbox is checked
//        setSelectedInfluencers([...selectedInfluencers, influencer]);
//      } else {
//        // Remove user from selectedInfluencers list if checkbox is unchecked
//        setSelectedInfluencers(selectedInfluencers.filter(selectedInfluencer => selectedInfluencer.id !== influencers.id));
//     }
//    }
  
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = {
//       campaign_name: campaignName,
//       influencers: selectedInfluencers.map(selectedInfluencer => selectedInfluencer.id),
//       budget: budget,
//       campaignType: campaignType
//     };

//     console.log(data);
//     axios.post('http://127.0.0.1:8000/newactivecampaigns/', data)
//       .then(response => console.log(response))
//       .catch(error => console.log(error));
//   }

 

//   return (
//     <div>
//       <h2>Create New Campaign</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="campaignName">Campaign Name:</label>
//         <input type="text" id="campaignName" name="campaignName" value={campaignName} onChange={handleCampaignNameChange} />
     
//         <label htmlFor="campaignBudget">Campaign budget:</label>
//         <input type="text" id="budget" name="budget" value={budget} onChange={handleCampaignBudgetChange} />
     
//         <label htmlFor="campaignType">Campaign type:</label>
//         <input type="text" id="campaignType" name="campaignType" value={campaignType} onChange={handleCampaignType} />
     
    

//         <label>Select Influencers: </label>
//         {influencers.map(influencer => (
//           <div key={influencer.id}>
//             <input type="checkbox" id={influencer.id} name="influencers" value={influencer.id} onChange={(e) => handleCheckboxChange(e, influencer)} />
//             <label htmlFor={influencer.id}>{influencer.influencer_username}</label>
           
//           </div>
//         ))}


//         <label htmlFor="date">date:</label>
//         <input type="text" id="date" name="date" value={date} onChange={handleDate} />
     


//         <button type="submit">Create Campaign</button>
//       </form>
//     </div>
//   );
// }

// export default InfluencerList;



// const NewCampaign = () => {
//   const [influencers, setInfluencers] = useState([]);
//   const [selectedInfluencers, setSelectedInfluencers] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);


//   const handleCheckboxChange = (event, user) => {
//     if (event.target.checked) {
//       // Add user to selectedUsers list if checkbox is checked
//       setSelectedInfluencers([...selectedInfluencers, user]);
//     } else {
//       // Remove user from selectedInfluencers list if checkbox is unchecked
//       setSelectedInfluencers(selectedInfluencers.filter(selectedInfluencer => selectedInfluencer.id !== influencers.id));
//     }
//   }


//   const handleOkButtonClick = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/newactivecampaigns/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(selectedInfluencers),
//       });
//       const data = await response.json();
//       console.log(data);
//       // Do something with the data, such as show a success message
//     } catch (error) {
//       console.error(error);
//       // Handle the error, such as showing an error message to the user
//     }
//   };




//   return (
//     <Container>
//       <Row>
//         <div>
//           {influencers.map(item => {
            
//             return (
//               <div key={item.id}>
//                  <input type="checkbox" onChange={event => handleCheckboxChange(event, influencers)} />
//                 <p>{item.influencer_full_name.slice(0, 15)}...</p>
//                 <p>@{item.influencer_username}</p>
                
               
//               </div>
//             );
//           })}
//         </div>
//         <Button style={{ backgroundColor: '#452c63' }} onClick={handleOkButtonClick}>
//           Create Campaign
//         </Button>
//       </Row>
//     </Container>
//   );
// };

// export default NewCampaign;



// const NewCampaign = () => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [influencers, setInfluencers] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const [storyCost, setStoryCost] = useState(0);
//   const [postCost, setPostCost] = useState(0);
  
//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   //make campaign live
//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//   };

//   const handleInfluencerChangeStory = (index, e) => {
//     const updatedInfluencers = [...influencers];
//     updatedInfluencers[index].story = e.target.checked;
//     setInfluencers(updatedInfluencers);

//     const cost = e.target.checked ? influencers[index].influencerStoryCost : -influencers[index].influencerStoryCost;
//     setStoryCost(storyCost + cost);
//   };

//   const handleInfluencerChangePost = (index, e) => {
//     const updatedInfluencers = [...influencers];
//     updatedInfluencers[index].post = e.target.checked;
//     setInfluencers(updatedInfluencers);

//     const cost = e.target.checked ? influencers[index].influencerInfluencerPostCost : -influencers[index].influencerInfluencerPostCost;
//     setPostCost(postCost + cost);
//   };

//   const removeInfluencer = (indexToRemove) => {
//   const removedInfluencer = influencers[indexToRemove];
//   const updatedInfluencers = influencers.filter((_, index) => index !== indexToRemove);
//   setInfluencers(updatedInfluencers);

//   const storyCostChange = removedInfluencer.story ? -removedInfluencer.influencerStoryCost : 0;
//   const postCostChange = removedInfluencer.post ? -removedInfluencer.influencerInfluencerPostCost : 0;
//   setStoryCost(storyCost => storyCost + storyCostChange);
//   setPostCost(postCost => postCost + postCostChange);
// };

// const fetchInfluencers = () => {
//   axios
//     .get('http://127.0.0.1:8000/influencers/')
//     .then((response) => {
//       setInfluencers(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

//   useEffect(() => {
//     // Calculate the total cost based on the sum of storyCost and postCost
//     setTotalCost(storyCost + postCost);
//   }, [storyCost, postCost]);


// const handleCreateCampaign = async (campaignData) => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/activecampaigns/', campaignData);
//       console.log(response.data);
//       // Do something with the response, such as show a success message
//     } catch (error) {
//       console.error(error);
//       // Handle the error, such as showing an error message to the user
//     }
//   };


//   return (
//     <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
//       <Row>
//        <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
//             {influencers.map((item,index) => {
//                const campaignData = {
//                 influencer_full_name : item.influencer_full_name,
//                 influencer_username : item.influencer_username,
//                 influencers: influencers.map((influencer) => influencer.id),
//                 storyCost: storyCost,
//                 postCost: postCost,
//                 totalCost: totalCost
//               }

//               return (
//                 <Col xs={8} sm={8} md={2} lg={2}>
//                   <div className="subContainerNC" style={{overflow:'hidden'}}>
//                     <img className='imageNC' src={`http://127.0.0.1:8000/${item.image}`}/>
//                     <p className='nameNC'>{item.influencer_full_name.slice(0, 15)}...</p>
//                     <p className='userNameNC'>@{item.influencer_username}</p>
//                     <p className='EngagementRateNC'>Engagement Rate</p>
//                     <p className='NumberNC'>{item.engagement_rate}</p>

                  
//                   </div>
//                 </Col>

//               )})}
//            </div>

//            <div className="d-lg-flex justify-content-between align-items-end d-sm-block " style={{border:'2px solid red'}}>
            

//                 <Button style={{backgroundColor: '#452c63'}} onClick={handleCreateCampaign(campaignData)}>
//                   Create Campaign
//                 </Button>
//            </div>
//       </Row>
//     </Container>
//   )  
// }

// export default NewCampaign;



// const NewCampaign = () => {
//   const [selected, setSelected] = useState('single');
//   const [isChecked, setIsChecked] = useState(false);
//   const [influencers, setInfluencers] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const removeInfluencer = (indexToRemove) => {
//     setInfluencers(influencers.filter((_, index) => index !== indexToRemove));
//   };

//   const [totalCost, setTotalCost] = useState(0);
//   useEffect(() => {
//     setTotalCost(
//       influencers.reduce(
//         (total, influencer) =>
//           total +
//           (isChecked
//             ? influencer.influencerInfluencerPostCost + influencer.influencerStoryCost
//             : 0),
//         0
//       )
//     );
//   }, [influencers, isChecked]);

//   return (
//     <Container className="mt-2" style={{ border: '1px solid rgb(198, 198, 198)' }}>
//       <Row>
//         <div className="pickedInfluencers" style={{ display: 'flex', flexWrap: 'nowrap' }}>
//           {influencers.map((item, index) => (
//             <Col xs={8} sm={8} md={2} lg={2} key={index}>
//               <div className="subContainerNC" style={{ overflow: 'hidden' }}>
//                 <img className="imageNC" src={`http://127.0.0.1:8000/${item.image}`} />
//                 <p className="nameNC">{item.influencer_full_name.slice(0, 15)}...</p>
//                 <p className="userNameNC">@{item.influencer_username}</p>
//                 <p className="EngagementRateNC">Engagement Rate</p>
//                 <div>
//                   <input
//                     className="inputNC"
//                     type="checkbox"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor="influencerPost">Influencer Post: {item.influencerInfluencerPostCost}</label>
//                 </div>
//                 <div>
//                   <input
//                     className="inputNC"
//                     type="checkbox"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor="story">Story: {item.influencerStoryCost}</label>
//                 </div>
//                 <button
//                   style={{ backgroundColor: 'red', borderRadius: '50%' }}
//                   onClick={() => removeInfluencer(index)}
//                 >
//                   -
//                 </button>
//               </div>
//             </Col>
//           ))}
//         </div>

//         <div className="d-lg-flex justify-content-between align-items-end d-sm-block ">
//           <div>
//             <input className="inputNC" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
//             <label htmlFor="liveCampaign">Make Campaign Live</label>
//           </div>
//           <div className="d-block">
//             <p>Total Cost: {totalCost}</p>
//             <Button style={{ backgroundColor: '#452c63' }}>Create Campaign</Button>
//               </div>
//            </div>
//       </Row>
//     </Container>
//   )  
// }

// export default NewCampaign;
         



// const NewCampaign = () => {
//   const [selected, setSelected] = useState('single');
//   const [isChecked, setIsChecked] = useState(false);
//   const [influencers, setInfluencers] = useState([]);
  
//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };


//   const removeInfluencer = (indexToRemove) => {
//     setInfluencers(influencers.filter((_, index) => index !== indexToRemove));
//   };



//   return (
//     <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
//       <Row>
//        <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
//             {influencers.map((item,index) => {
//               return (
//                 <Col xs={8} sm={8} md={2} lg={2}>
//                   <div className="subContainerNC" style={{overflow:'hidden'}}>
//                     <img className='imageNC' src={`http://127.0.0.1:8000/${item.image}`}/>
//                     <p className='nameNC'>{item.influencer_full_name.slice(0, 15)}...</p>
//                     <p className='userNameNC'>@{item.influencer_username}</p>
//                     <p className='EngagementRateNC'>Engagement Rate</p>
//                     {/* <p className='NumberNC'>{item.engagement_rate}</p> */}
//                     <button style={{backgroundColor:'red', borderRadius:'50%'}} onClick={() => removeInfluencer(index)}>-</button>
//                   </div>
//                 </Col>
//               )})}
//            </div>

//            <div className="d-lg-flex justify-content-between align-items-end d-sm-block ">
//               <div>
//                   <input className='inputNC'
//                     type="checkbox"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}/>
//                   <label>Make Campaign Live</label>
//               </div>
//               <div className="d-block">
//                 <p>Total Cost: 500k</p>
//                 <Button style={{backgroundColor: '#452c63'}}>
//                   Create Campaign
//                 </Button>
//               </div>
//            </div>
//       </Row>
//     </Container>
//   )  
// }

// export default NewCampaign;