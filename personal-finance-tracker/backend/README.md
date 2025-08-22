# Personal Finance Tracker Backend

This is the backend for the Personal Finance Tracker application, built using the MERN stack (MongoDB, Express, React, Node.js). The backend is responsible for handling API requests related to financial data, including transactions and budgets.

## Project Structure

- **src/**: Contains the source code for the backend application.
  - **controllers/**: Contains the controller functions for handling requests.
    - `financeController.js`: Handles finance-related requests.
  - **models/**: Contains the Mongoose models for the application.
    - `financeModel.js`: Defines the schema for transactions and budgets.
  - **routes/**: Contains the API routes for the application.
    - `financeRoutes.js`: Defines routes for finance-related API endpoints.
  - `app.js`: The entry point for the backend application, setting up the Express server and middleware.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd personal-finance-tracker/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the MongoDB server.
2. Run the backend server:
   ```
   npm start
   ```

The backend server will be running on `http://localhost:5000` by default.

## API Endpoints

- **GET /api/finance/transactions**: Fetch all transactions.
- **POST /api/finance/transactions**: Create a new transaction.
- **GET /api/finance/budgets**: Fetch all budgets.
- **POST /api/finance/budgets**: Create a new budget.

## License

This project is licensed under the MIT License.