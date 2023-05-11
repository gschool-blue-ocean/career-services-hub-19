import React, { useState } from 'react';
import './search.css'

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search Students"
        className='student-search-bar'
        />
    </form>
    );
};

export default SearchBar;
