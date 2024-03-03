import React from 'react';
import { render, screen } from '@testing-library/react';
import JobCard from './JobCard';

describe('JobCard', () => {
  const jobProps = {
    id: 1,
    title: 'Software Engineer',
    salary: 120000,
    equity: 0.1,
    companyName: 'Tech Corp',
    hasApplied: false,
    applyCallback: () => { }
  };

  it('renders job information correctly', () => {
    render(<JobCard {...jobProps} />);

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(/Salary:/)).toBeInTheDocument();
    expect(screen.getByText(/120000/)).toBeInTheDocument();
    expect(screen.getByText(/Equity:/)).toBeInTheDocument();
    expect(screen.getByText(/0.1/)).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Apply' })).not.toBeDisabled();
  });

  it('apply button changes text when hasApplied is true', () => {
    render(<JobCard {...jobProps} hasApplied={true} />);
    expect(screen.getByRole('button')).toHaveTextContent('Applied');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls applyCallback when apply button is clicked', () => {
    const applyCallbackMock = jest.fn();
    render(<JobCard {...jobProps} applyCallback={applyCallbackMock} />);
    screen.getByRole('button', { name: 'Apply' }).click();
    expect(applyCallbackMock).toHaveBeenCalled();
  });
});
