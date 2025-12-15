## Backend Libraries

- **express** (`^4.18.2`)  
  - Web server framework for building the REST API.

- **mongoose** (`^8.0.3`)  
  - ODM (Object Data Modeling) library for MongoDB, used for defining schemas and interacting with the database.

- **cors** (`^2.8.5`)  
  - Middleware to enable Cross-Origin Resource Sharing between the React frontend and Node backend.

- **dotenv** (`^16.3.1`)  
  - Loads environment variables from a `.env` file into `process.env`.

- **multer** (`^1.4.5-lts.1`)  
  - Middleware for handling `multipart/form-data` (reserved for future file/image upload support).

- **bcryptjs** (`^2.4.3`)  
  - Library for hashing and verifying passwords for user authentication.

- **jsonwebtoken** (`^9.0.2`)  
  - Generates and verifies JWTs for securing API endpoints.

- **axios** (`^1.6.2`)  
  - HTTP client used on the backend when needed (e.g., calling external services in future extensions).

- **nodemon** (`^3.0.2`) *(devDependency)*  
  - Auto-restarts the Node server on file changes during development.

- **concurrently** (`^8.2.2`) *(devDependency)*  
  - Runs the backend and frontend dev servers in parallel with a single command.

---

## Frontend Libraries

- **react** (`18.2.0`)  
  - Core library for building the user interface.

- **react-dom** (`18.2.0`)  
  - DOM-specific rendering for React.

- **react-router-dom** (`^6.30.2`)  
  - Client-side routing (navigation between pages like Home, Wardrobe, Outfits, Inspirations, Profile).

- **react-scripts** (`^5.0.1`)  
  - Build and development tooling from Create React App (webpack, Babel, dev server, etc.).

- **axios** (`^1.13.2`)  
  - HTTP client used by the frontend to call the backend API.

- **web-vitals** (`^2.1.4`)  
  - Utilities for measuring and reporting web performance metrics.

---

## Frontend Testing Libraries

- **@testing-library/react** (`^16.3.0`)  
  - Utilities for testing React components in a way that resembles user interactions.

- **@testing-library/jest-dom** (`^6.9.1`)  
  - Custom Jest matchers for asserting on DOM nodes (e.g., `toBeInTheDocument`).

- **@testing-library/dom** (`^10.4.1`)  
  - Low-level DOM testing utilities used by React Testing Library.

- **@testing-library/user-event** (`^13.5.0`)  
  - Simulates user interactions (clicks, typing, etc.) in tests.

---

## Frontend Styling / Build Tooling

- **tailwindcss** (`^3.4.19`) *(devDependency)*  
  - Utility-first CSS framework used for styling the UI.

- **postcss** (`^8.5.6`) *(devDependency)*  
  - CSS processing tool used under the hood by Tailwind and the build pipeline.

- **autoprefixer** (`^10.4.22`) *(devDependency)*  
  - PostCSS plugin that adds vendor prefixes to CSS for better browser support.



