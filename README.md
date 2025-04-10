🌐 **Live Demo**: [Management System](https://pavelmihutski.github.io/management-system)

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
