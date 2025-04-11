# Management System

🌐 **Live Demo**: [Management System](https://pavelmihutski.github.io/management-system)

## Design Decisions

- All backend-like communication was handled using service worker (**MSW**). It will also be used for **integration** and **unit tests** later.

- **React Query** was chosen as an alternative to a global store and as an optimal solution for:

  - managing server state,
  - interacting with the backend, and caching previously fetched requests.
  - Invalidation is triggered on **creation actions**.

- **Zod** was chosen for:

  - **runtime API response validation**, and
  - **form validation**.

- The **test execution environment** was set to **browser** to better reflect the **real execution context**.

## Getting Started

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Testing

This project uses Vitest for testing. There are several testing commands available:

- Run tests:

```bash
npm run test
```

- Run tests with coverage:

```bash
npm run test:coverage
```

## Code Quality

The project includes several tools to maintain code quality:

- Lint code:

```bash
npm run lint
```

- Fix linting issues:

```bash
npm run lint:fix
```

- Format code with Prettier:

```bash
npm run prettier:fix
```

## Deployment

The project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This will build the project and deploy it to GitHub Pages.

## Tech Stack

- React 19
- TypeScript
- Vite
- Styled Components
- React Query
- Axios
- Zod
- Vitest
- MSW (Mock Service Worker)
- Playwright

## Project Structure

```
src/
├── api/        # API related code
├── app/        # Main application code
├── assets/     # Static assets
├── components/ # Reusable components
├── data/       # Data related code
├── hooks/      # Custom React hooks
├── testing/    # Test utilities and setup
└── main.tsx    # Application entry point
```
