import React, { useState } from "react";

const testData = [
  { name: "John", gender: "Male", isParent: 'Yes', numOfKids: 2, kidsAge: [4, 6], options: ["Option 1", "Option 2"] },
  { name: "Jane", gender: "Female", isParent: 'Yes', numOfKids: 1, kidsAge: [3], options: ["Option 1", "Option 2"] },
  { name: "Bob", gender: "Male", isParent: 'No', numOfKids: 0, kidsAge: [],options: ["Option 2"] },
  { name: "Alice", gender: "Female", isParent: 'Yes', numOfKids: 3, kidsAge: [2, 5, 8],options: ["Option 3", "Option 2"] },
  { name: "Tom", gender: "Male", isParent: 'Yes', numOfKids: 2, kidsAge: [7, 9],options: ["Option 1", "Option 3"] },
  { name: "Sara", gender: "Female", isParent: 'No', numOfKids: 0, kidsAge: [],options: ["Option 1", "Option 3"] }
];

const Test = () => {
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = () => {
    const filtered = testData.filter(
      (item) =>
        item.kidsAge.some((age) => age >= parseInt(minAge) && age <= parseInt(maxAge))
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="Minimum age"
          value={minAge}
          onChange={(e) => setMinAge(e.target.value)}
        />
        <input
          type="number"
          placeholder="Maximum age"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <div>
        {filteredData.map((item) => (
          <div key={item.name}>
            <div>Name: {item.name}</div>
            <div>Children Age: {item.kidsAge.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;

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
