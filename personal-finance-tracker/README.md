# Personal Finance Tracker

## Overview
The Personal Finance Tracker is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to track their personal finances, including income, expenses, budgets, and financial goals. The dashboard features a modern dark-themed UI with purple and blue gradients, providing an intuitive and visually appealing user experience.

## Features
- **Dashboard**: View total income, expenses, savings, and budget progress.
- **Charts**: Visualize financial data with line and pie charts.
- **Calendar**: Track transactions and budgets on a monthly calendar.
- **Activities**: View the latest transactions in a list format.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used
- **Frontend**: React.js, React Router, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Styling**: Custom CSS for dark theme with gradients

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

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```
3. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application
1. Start the backend server:
   ```
   cd backend
   npm start
   ```
2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### Usage
- Access the application in your web browser at `http://localhost:3000`.
- Use the dashboard to track your finances and visualize your data.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.