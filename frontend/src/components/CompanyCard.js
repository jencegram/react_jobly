import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CompanyList.css';

/**
 * Company Card Component 
 * For displaying a single company card.
 *
 * This component presents a brief overview of a company including its logo,
 * name, and description. It is intended to be used within a list of companies,
 * allowing users to click through to a detailed view of the company.
 *
 * @param {Object} props - Props for the company card.
 * @param {string} props.handle - The unique identifier for the company.
 * @param {string} props.name - The name of the company.
 * @param {string} props.description - A brief description of the company.
 * @param {string} [props.logoUrl] - The URL of the company's logo.
 * @returns {ReactElement} The CompanyCard component.
 */

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  return (
    <Link to={`/companies/${handle}`} className="company-card">
      {logoUrl && <img src={logoUrl} alt={`${name} Logo`} />}
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default CompanyCard;
