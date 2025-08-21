# Finance Tracker Frontend

This project is a React-based frontend application for managing personal finances. It allows users to track their expenses, set budgets, and view financial insights through various components and pages.

## Project Structure

The project is organized into the following main directories:

- **public/**: Contains static files such as the main HTML file, manifest, and favicon.
- **src/**: Contains all the source code for the application, including components, pages, hooks, context, utilities, and styles.

### Components

- **common/**: Reusable components like buttons, inputs, and modals.
- **auth/**: Components related to user authentication, including login and registration forms.
- **dashboard/**: Components for displaying the main dashboard and financial insights.
- **expense/**: Components for managing expenses, including forms and lists.
- **budget/**: Components for budget management and alerts.
- **navigation/**: Components for site navigation, including headers and sidebars.

### Pages

- **LoginPage**: The login route for users.
- **RegisterPage**: The registration route for new users.
- **DashboardPage**: The main dashboard view for users.
- **ExpensesPage**: The page for managing and viewing expenses.
- **BudgetPage**: The page for budget management.
- **ForecastPage**: The page for viewing financial forecasts.
- **ProfilePage**: The page for managing user profiles.

### Hooks

Custom hooks for managing authentication, expenses, budgets, validation, and API calls.

### Context

Context providers for managing global state related to authentication, expenses, and themes.

### Utilities

Utility functions for validation, formatting, constants, API requests, and other helper functions.

### Styles

CSS files for global styles, component-specific styles, and CSS variables.

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd finance-tracker-frontend
npm install
```

Then, you can run the application:

```bash
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.