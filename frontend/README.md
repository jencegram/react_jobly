# Jobly

Jobly is a full-stack job search platform designed for connecting job seekers with potential employers. As part of my learning journey as a student, I built this project to hone my skills in full-stack development. The application allows users to discover companies, explore job listings, and submit applications with ease.

## About

The frontend is developed with React, ensuring a responsive and intuitive user interface, while the backend is powered by Express and Node.js, featuring a RESTful API and secure user authentication. The design is crafted with modern CSS practices for a consistent and engaging user experience across various devices.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)

### Installation and Local Development

1. Clone the repository and navigate into it:

   ```bash
   git clone https://github.com/jencegram/react_jobly.git
   cd r-jobly

   ```

2. Install dependencies for the backend:
   cd backend
   npm install

3. Configure environment variables in the backend by setting them in your development environment or by creating a .env file in the backend directory:

   SECRET_KEY=your_secret_key_here
   PORT=3001
   DATABASE_URL=postgresql://username:password@localhost/jobly

4. Install dependencies for the frontend:
   cd ../frontend
   npm install

5. Start the backend server:
   npm start

6. In a new terminal, start the frontend development server:
   cd ../frontend
   npm start

The application should now be running at http://localhost:3000.

### Testing

Run the test suite with:

```bash
npm test

```
