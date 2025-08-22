# Personal Finance Tracker

## Overview
The Personal Finance Tracker is a web application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to track their personal finances. The application features a modern dark-themed UI with purple and blue gradients, providing an intuitive and visually appealing user experience.

## Features
- **Dashboard**: View total income, expenses, savings, and progress towards budgets.
- **Charts**: Visualize financial data with line and pie charts.
- **Calendar**: Keep track of transactions and important dates.
- **Activities**: View the latest transactions in a list format.
- **Responsive Design**: The application is designed to be fully responsive across devices.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed and running, or access to a MongoDB Atlas account.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd personal-finance-tracker
   ```

2. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

3. Navigate to the backend directory and install dependencies:
   ```
   cd ../backend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   node src/app.js
   ```

2. Start the frontend application:
   ```
   cd ../frontend
   npm start
   ```

3. Open your browser and go to `http://localhost:3000` to view the application.

## Project Structure
```
personal-finance-tracker
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── app.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

## License
This project is licensed under the MIT License. See the LICENSE file for details.