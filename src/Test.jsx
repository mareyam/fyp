import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SortButton = ({ handleSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortOrder = (order) => {
    handleSort(order);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" onClick={toggleDropdown}>
        Filter
      </button>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        <button className="dropdown-item" onClick={() => handleSortOrder('asc')}>
          Ascending
        </button>
        <button className="dropdown-item" onClick={() => handleSortOrder('desc')}>
          Descending
        </button>
      </div>
    </div>
  );
};

const FilteredList = () => {
  const [sortedNames, setSortedNames] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/campaigns/')
      .then(response => {
        setSortedNames(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const sorted = [...sortedNames].sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setSortedNames(sorted);
  }, [sortOrder]);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  return (
    <div>
      <SortButton handleSort={handleSort} />
      <ul>
        {sortedNames.map((name) => (
          <li key={name.id}>{name.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredList;
