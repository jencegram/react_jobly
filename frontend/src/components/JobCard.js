import React from 'react';
import '../styles/JobCard.css';

const JobCard = ({ id, title, salary, equity, companyName, hasApplied, applyCallback }) => {
  // handleApply uses the applyCallback prop directly
  const handleApply = async () => {
    if (!hasApplied) {
      try {
        // Call the applyCallback if it's a function
        if (applyCallback && typeof applyCallback === 'function') {
          applyCallback(id);
        }
      } catch (err) {
        console.error("Apply to job failed:", err);
      }
    }
  };

  return (
    <div className="job-card">
      <h3>{title}</h3>
      <div><strong>Salary:</strong> {salary ? salary : "N/A"}</div>
      <div><strong>Equity:</strong> {equity ? equity : "None"}</div>
      {companyName && <div><strong>Company:</strong> {companyName}</div>}
      <button
        onClick={handleApply}
        disabled={hasApplied}
        className={hasApplied ? "applied" : "apply"}
      >
        {hasApplied ? "Applied" : "Apply"}
      </button>
    </div>
  );
};

export default JobCard;
