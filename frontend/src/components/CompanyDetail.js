import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoblyApi from '../api';
import JobCard from './JobCard';
import UserContext from '../UserContext';
import '../styles/CompanyDetail.css';

/**
 * Company Detail Component 
 * Displays details for a single company and lists its available jobs.
 * Allows authenticated users to apply to jobs listed under the company.
 */

const CompanyDetail = () => {
  // State for storing company details and its jobs
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);

  // Hooks for navigation and accessing URL parameters
  const { handle } = useParams();
  const navigate = useNavigate();

  // Accessing the global user context
  const { currentUser, handleJobApplication } = useContext(UserContext);

  /**
     * Fetches company details and job listings for the company from the API.
     * Updates the state with fetched data.
     */
  useEffect(() => {
    async function getCompanyAndJobs() {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        const jobsData = await JoblyApi.getJobsForCompany(handle);
        // Updates jobs data to include application status for the current user
        setCompany(companyData);
        setJobs(jobsData.map(job => ({
          ...job,
          hasApplied: currentUser.applications.includes(job.id),
        })));
      } catch (error) {
        console.error("API Error:", error.response || error);
      }
    }

    // Re-fetch data if the company or user's applications change
    getCompanyAndJobs();
  }, [handle, currentUser.applications]);

  // Shows a loading message until company data is fetched
  if (!company) return <div>Loading...</div>;

  return (
    <div className="company-detail">
      <button onClick={() => navigate('/companies')} className="back-button">
        Back to Companies
      </button>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <h2>Jobs at {company.name}</h2>
      <div>
        {jobs.map(job => (
          <JobCard
            key={job.id}
            {...job}
            hasApplied={job.hasApplied}
            applyCallback={handleJobApplication}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyDetail;
