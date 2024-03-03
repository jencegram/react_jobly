import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import CompanyCard from './CompanyCard';

/**
 * CompanyCard tests.
 *
 * These tests check the rendering behavior of the CompanyCard component to ensure it displays
 * the appropriate content based on the props it receives.
 */

describe('CompanyCard', () => {
  // Sample data for a company card
  const company = {
    handle: 'test-company',
    name: 'Test Company',
    description: 'This is a test company.',
    logoUrl: 'http://test.logo.url/logo.png'
  };

  it('renders company information', () => {
    render(
      <BrowserRouter>
        <CompanyCard {...company} />
      </BrowserRouter>
    );

    expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(screen.getByText(company.description)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: `${company.name} Logo` })).toHaveAttribute('src', company.logoUrl);
  });

  it('does not display an image when logoUrl is undefined', () => {
    const { handle, name, description } = company;
    render(
      <BrowserRouter>
        <CompanyCard handle={handle} name={name} description={description} />
      </BrowserRouter>
    );

    expect(screen.queryByRole('img', { name: `${company.name} Logo` })).not.toBeInTheDocument();
  });
});
