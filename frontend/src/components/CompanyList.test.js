import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompanyList from './CompanyList';
import JoblyApi from '../api';

jest.mock('../api', () => ({
  getCompanies: jest.fn()
}));

// Mock data for companies
const mockCompanies = [
  { handle: 'company1', name: 'Company One', description: 'Description one', logoUrl: 'http://example.com/logo1.png' },
  { handle: 'company2', name: 'Company Two', description: 'Description two', logoUrl: 'http://example.com/logo2.png' }
];

// Reset mock implementations before each test
beforeEach(() => {
  JoblyApi.getCompanies.mockResolvedValue(mockCompanies);
});

describe('CompanyList', () => {
  test('displays a list of companies', async () => {
    render(
      <BrowserRouter>
        <CompanyList />
      </BrowserRouter>
    );

    // Wait for each company to be displayed separately
    for (const company of mockCompanies) {
      await waitFor(() => {
        expect(screen.getByText(company.name)).toBeInTheDocument();
      });
    }
  });

  test('shows a message when no companies are found', async () => {
    JoblyApi.getCompanies.mockResolvedValue([]);

    render(
      <BrowserRouter>
        <CompanyList />
      </BrowserRouter>
    );

    // Wait for the message to appear
    await waitFor(() => {
      expect(screen.getByText('No companies found.')).toBeInTheDocument();
    });
  });

  test('updates companies based on search term', async () => {
    // Mock a search term response
    const searchTerm = "One";
    JoblyApi.getCompanies.mockResolvedValue(mockCompanies.filter(c => c.name.includes(searchTerm)));

    render(
      <BrowserRouter>
        <CompanyList />
      </BrowserRouter>
    );

    // Simulate entering a search term and submitting the form
    fireEvent.change(screen.getByPlaceholderText('Enter search term...'), { target: { value: searchTerm } });
    fireEvent.click(screen.getByText('Search'));

    // Expect only the filtered company to be displayed
    await waitFor(() => {
      expect(screen.getByText('Company One')).toBeInTheDocument();
    });

    // Separately check that the other company is not displayed
    await waitFor(() => {
      expect(screen.queryByText('Company Two')).not.toBeInTheDocument();
    });
  });
});
