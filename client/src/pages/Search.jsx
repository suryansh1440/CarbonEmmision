import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    age: '',
    location: '',
    subject: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Perfect Tutor</h1>
        <p className="text-gray-600 text-lg">Search through our network of qualified tutors</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, location, or tutor name..."
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Search
          </button>
        </div>
      </form>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FiFilter className="text-gray-600" />
            Filters
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.subject}
            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Subject</option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
            <option value="english">English</option>
            <option value="history">History</option>
          </select>

          <select
            value={filters.age}
            onChange={(e) => setFilters({ ...filters, age: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Age Group</option>
            <option value="elementary">Elementary (5-11)</option>
            <option value="middle">Middle School (11-14)</option>
            <option value="high">High School (14-18)</option>
            <option value="college">College (18+)</option>
          </select>

          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Location</option>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Results section - to be implemented */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add tutor cards here */}
      </div>
    </div>
  );
};

export default Search;