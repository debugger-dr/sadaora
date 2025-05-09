# Sadaora Starter App

A lightweight version of a "Member Profiles + Feed" app built with React, Node.js (Express), and PostgreSQL. This project demonstrates user profile management, JWT-based authentication, and a public feed of profiles with pagination.

## Setup Instructions

### Prerequisites:
- **Node.js** (v16.x or above)
- **npm** (v7.x or above)
- **PostgreSQL** (if running locally)

### 1. Clone the Repository:
```bash
git clone <repository-url>
cd sadaora-app
```

### 2. Backend Setup (Node.js + Express):

# Navigate to the backend directory:
```bash
cd backend
```

# Install dependencies:
```bash
npm install
```

# Create .env file:
- Create a .env file in the backend folder and add the following environment variables:

.env

DATABASE_URL=your-postgresql-database-url
JWT_SECRET=your-jwt-secret

# Run migrations (if using Prisma):
```bash
npx prisma migrate dev --name init
npx prisma generate
```

# Start the backend server:
```bash
npm run dev
```

# The backend should be running at http://localhost:3000.

### 3. Frontend Setup (React):

# Navigate to the frontend directory:
```bash
cd frontend
```

# Install dependencies:
```bash
npm install
```

# Start the frontend server:
```bash
npm run dev
```

# The frontend should now be accessible at http://localhost:5173

### Architectural Decisions
This project follows a full-stack architecture, with the backend built using Node.js and Express, and the frontend built with React.js.

Frontend: The React app handles the user interface. We used React Router to manage navigation and routing, providing a smooth transition between views. The state management is handled locally in components.

Backend: The Express app handles JWT-based authentication and communicates with the database through Prisma ORM. The backend provides API endpoints for user authentication and profile management.

Database: The project uses PostgreSQL to store user information and profiles. Prisma ORM simplifies database interaction and schema management.

This architecture ensures separation of concerns, scalability, and ease of deployment. The use of JWT tokens ensures secure authentication, and the profile data is separated from user authentication, which makes it easy to manage.