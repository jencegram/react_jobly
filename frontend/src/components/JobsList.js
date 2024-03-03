import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from '../api';
import JobCard from './JobCard';
import UserContext from '../UserContext';
import '../styles/JobsList.css';

/**
 * Component to display a list of jobs and allow users to search and apply for them.
 * @returns {JSX.Element} JobsList component.
 */

const JobsList = () => {
  // Context and state initialization
  const { currentUser, handleJobApplication } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [searchTerms, setSearchTerms] = useState({ title: "", minSalary: "", hasEquity: false });

  // Fetch jobs from the API based on search terms and user information
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await JoblyApi.getJobs(searchTerms);
        const updatedJobs = jobsData.map(job => ({
          ...job,
          hasApplied: currentUser.applications.includes(job.id),
        }));
        setJobs(updatedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };

    fetchJobs();
  }, [searchTerms, currentUser]);


  // Callback function to handle job application
  const applyCallback = async (jobId) => {
    await handleJobApplication(jobId);
    // Update local jobs state to reflect the application
    setJobs(jobs => jobs.map(job => job.id === jobId ? { ...job, hasApplied: true } : job));
  };

  // Handlers for search input changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(s => ({ ...s, [name]: value }));
  };

  // Handler for checkbox change to filter by equity
  const handleCheckboxChange = (e) => {
    setSearchTerms(s => ({ ...s, hasEquity: e.target.checked }));
  };

  // Handler for search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await JoblyApi.getJobs(searchTerms).then(jobsData => {
      const jobsWithAppliedStatus = jobsData.map(job => ({
        ...job,
        hasApplied: currentUser.applications.includes(job.id)
      }));
      setJobs(jobsWithAppliedStatus);
    });
  };

  // Render JobsList component
  return (
    <div className="jobs-list">
      <h1>Jobs</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          name="title"
          value={searchTerms.title}
          onChange={handleSearchChange}
          placeholder="Title"
        />
        <input
          name="minSalary"
          value={searchTerms.minSalary}
          onChange={handleSearchChange}
          placeholder="Minimum Salary"
          type="number"
        />
        <label>
          Has Equity?
          <input
            name="hasEquity"
            type="checkbox"
            checked={searchTerms.hasEquity}
            onChange={handleCheckboxChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {jobs.map(job => (
        <JobCard
          key={job.id}
          {...job}
          hasApplied={currentUser.applications.includes(job.id)}
          applyCallback={applyCallback} // Pass the applyCallback to JobCard
        />
      ))}
    </div>
  );
};

export default JobsList;