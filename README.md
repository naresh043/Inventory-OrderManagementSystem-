# Inventory & Order Management System – Frontend

## Project Overview

This is a React-based frontend application for a Role-Based Inventory & Order Management System developed as part of a Full-Stack Developer Intern assignment.

The system supports role-based access control (RBAC) on the frontend, providing tailored user experiences based on assigned roles. The purpose of the system is to efficiently manage inventory and orders while ensuring secure, role-specific UI behavior.

Roles include:

- **Admin** – manage users and products
- **Sales Executive** – create and manage orders
- **Warehouse Staff** – update stock levels
- **Viewer** – read-only access

## Features (Frontend Only)

- **Role-based dashboards**: Customized dashboards displaying relevant KPIs and actions based on user roles.
- **Protected routes**: Routes secured using authentication state to prevent unauthorized access.
- **Dynamic navigation**: Sidebar and menu items that adapt based on the user's role.
- **Order status indicators and stock level badges**: Visual cues for order statuses and stock levels.
- **Access Denied / Unauthorized pages**: Dedicated pages for handling access restrictions.
- **Auto-logout on session expiry**: Automatic logout when JWT tokens expire.

## Tech Stack (Frontend)

- **React**: Core framework for building the user interface.
- **React Router**: For client-side routing and navigation.
- **Redux Toolkit**: For state management (global state handling).
- **Tailwind CSS**: For styling and responsive design.
- **PrimeReact**: UI component library for enhanced user experience.
- **Axios**: For making HTTP requests to the backend API.

## Application Structure

The application follows a modular structure with clear separation of concerns:

- **components/**: Reusable UI components organized by feature (e.g., auth, common, dashboard, orders, products, stocks, users).
- **pages/**: Page-level components representing main views (e.g., Login, Dashboard, Products, Orders, Stocks, Users).
- **routes/**: Routing configuration, including role-based route protection.
- **store/**: Redux store setup with slices for API, products, and users.
- **context/**: React Context for authentication state management.
- **api/**: Axios configuration and API service functions.
- **utils/**: Utility functions, constants, and helpers.
- **hooks/**: Custom React hooks for reusable logic.

This structure ensures separation of UI, routing, API calls, and authentication handling.

## Authentication & Authorization (Frontend Perspective)

- **JWT Handling**: Tokens are stored in localStorage upon login and included in API requests.
- **Role-based Route Protection**: Routes are protected using a `PrivateRoute` component that checks authentication and role permissions.
- **Conditional Rendering**: UI elements and actions are conditionally rendered based on user roles.

## Setup & Installation (Frontend Only)

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd inorder-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure environment variables (see Environment Variables section).

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173` (default Vite port).

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=https://role-bases-backend.onrender.com
```

- `VITE_API_URL`: Base URL for the backend API.

## Screens / Pages

- **Login**: User authentication page.
- **Dashboard**: Role-specific dashboard with KPIs and quick actions.
- **Products**: Product listing, details, and management (role-dependent).
- **Orders**: Order creation, listing, and management (role-dependent).
- **Stock Management**: Stock level updates and history (role-dependent).
- **Users**: User management (Admin only).
- **Access Denied / 404**: Error pages for unauthorized access or not found routes.

## Deployment

The application is deployed using Netlify. Single Page Application (SPA) routing is handled via redirects configured in `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Notes

- The frontend is decoupled from the backend, communicating via RESTful APIs.
- Backend APIs are assumed to be secured with RBAC, ensuring data integrity and access control.
- This project demonstrates proficiency in React, state management, routing, and role-based UI implementation.

## 🔐 Demo Credentials

For testing purposes, use the following credentials:

### 👑 Admin
- **Username**: admin@gmail.com 
- **Password**: admin123

### 🧑‍💼 Sales Executive
- **Username**: sales@gmail.com  
- **Password**: sales123  

### 🏭 Warehouse Staff
- **Username**: warehouse@gmail.com    
- **Password**: warehouse123  

### 👀 Viewer
- **Username**: viewer@gmail.com    
- **Password**: viewer123  