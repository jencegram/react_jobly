import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';
import '../styles/CompanyList.css';

/**
 * CompanyList Component
 * Displays a list of companies. Users can filter companies using a search term.
 * 
 * State:
 * - companies: Array of company objects to be displayed.
 * - searchTerm: The current search term used to filter companies.
 * 
 * Side Effects:
 * - Calls getCompanies on component mount and when searchTerm changes, to fetch and display companies.
 * 
 * Returns:
 * - A list of CompanyCard components for each company in the state.
 * - A search form that allows users to filter companies by name.
 * - A message indicating "No companies found." if the companies array is empty.
 */

const CompanyList = () => {
  // State initialization
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /**
  * Fetches companies from the API based on the current search term.
  * Updates the companies state with the fetched data.
  * 
  * @param {string} search - The current search term used to filter companies.
  */
  const getCompanies = async (search = "") => {
    const searchFilters = search ? { name: search } : {};
    const companiesData = await JoblyApi.getCompanies(searchFilters);
    setCompanies(companiesData);
  };

  // Fetch companies on component mount and when searchTerm changes
  useEffect(() => {
    getCompanies(searchTerm);
  }, [searchTerm]);

  /**
  * Handles the search form submission.
  * Prevents the default form submit action and fetches companies based on the current search term.
  * 
  * @param {Event} e - The form submit event.
  */
  const handleSearch = (e) => {
    e.preventDefault();
    getCompanies(searchTerm);
  };

  // Component rendering
  return (
    <div className="company-list">
      <h1>Companies</h1>
      <div className="search-bar-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter search term..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {companies.length > 0 ? (
        companies.map(company => (
          <CompanyCard key={company.handle} handle={company.handle} {...company} />
        ))
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
};

export default CompanyList;