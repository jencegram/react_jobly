import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import JobsList from '../components/JobsList';
import UserContext from '../UserContext';
import JoblyApi from '../api';


jest.mock('../api', () => ({
  getJobs: jest.fn(),
  applyToJob: jest.fn()
}));

describe('JobsList', () => {
  const mockJobs = [
    { id: 1, title: 'Software Engineer', salary: 120000, equity: '0.05', companyName: 'Google', hasApplied: false },
    { id: 2, title: 'Web Developer', salary: 100000, equity: '0', companyName: 'Facebook', hasApplied: false }
  ];

  const currentUser = {
    username: 'testuser',
    applications: []
  };

  const handleJobApplication = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    JoblyApi.getJobs.mockClear();
    JoblyApi.applyToJob.mockClear();
    handleJobApplication.mockClear();
  });

  it('displays jobs fetched from the API', async () => {
    JoblyApi.getJobs.mockResolvedValue(mockJobs);

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, handleJobApplication }}>
          <JobsList />
        </UserContext.Provider>
      </BrowserRouter>
    );

    // Wait for the API response and the component to update
    await waitFor(() => {
      mockJobs.forEach(job => {
        expect(screen.getByText(job.title)).toBeInTheDocument();
      });
    });
  });

  it('allows a user to apply to a job', async () => {
    JoblyApi.getJobs.mockResolvedValue(mockJobs);
    JoblyApi.applyToJob.mockResolvedValue({ applied: mockJobs[0].id });

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, handleJobApplication }}>
          <JobsList />
        </UserContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockJobs[0].title)).toBeInTheDocument();
    });

    
    const applyButtons = screen.getAllByText('Apply');
    fireEvent.click(applyButtons[0]);

    expect(handleJobApplication).toHaveBeenCalledWith(mockJobs[0].id);
  });
});

export default JobsList;
