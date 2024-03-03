import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyDetail from './CompanyDetail';
import UserContext from '../UserContext';
import JoblyApi from '../api';

// Mocking JoblyApi calls
jest.mock('../api', () => ({
  getCompany: jest.fn(),
  getJobsForCompany: jest.fn(),
}));

describe('CompanyDetail', () => {
  // Mock data for tests
  const companyData = {
    name: 'Test Company',
    description: 'This is a test company.',
    jobs: [
      { id: 1, title: 'Software Engineer', salary: 120000, equity: '0', hasApplied: false },
      { id: 2, title: 'Product Manager', salary: 130000, equity: '0.05', hasApplied: false }
    ],
  };

  const currentUser = {
    username: 'testuser',
    applications: [],
  };

  // Function to mock job application
  const handleJobApplication = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    JoblyApi.getCompany.mockResolvedValue(companyData);
    JoblyApi.getJobsForCompany.mockResolvedValue(companyData.jobs);
    handleJobApplication.mockClear();
  });

  it('renders company details and job cards', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, handleJobApplication }}>
          <CompanyDetail />
        </UserContext.Provider>
      </BrowserRouter>
    );

    // Check for company details
    expect(await screen.findByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('This is a test company.')).toBeInTheDocument();

    // Check for job listings
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
  });

  it('handles job application', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, handleJobApplication }}>
          <CompanyDetail />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const applyButton = await screen.findAllByText('Apply');
    fireEvent.click(applyButton[0]); // Click the apply button for the first job

    expect(handleJobApplication).toHaveBeenCalledWith(companyData.jobs[0].id);
  });
});