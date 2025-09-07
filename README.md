# finance-tracker

[Preview the app](https://eslam-dv.github.io/finance-trakcer)

Finance Tracker is a modern web application for managing personal finances. It provides tools to track expenses, analyze spending, and visualize financial data with an intuitive interface.

## Features

- Dashboard with summary cards
- Expense breakdown pie chart
- Transaction history
- Sidebar navigation
- Theme toggling (light/dark)
- Responsive design

## Technologies Used

- **React**: UI library for building interactive interfaces
- **TypeScript**: Type safety for scalable development
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Custom Hooks**: Encapsulate logic (e.g., useTheme, useTransactions)
- **ESLint**: Linting and code quality
- **Shadcn / Tailwind CSS**: Styling

## Custom Hooks

- `useTheme`: Manages theme toggling (light/dark)
- `useTransactions`: Handles fetching and updating transaction data

## Project Structure

```
client/
  ├── public/              # Static assets
  ├── src/
  │   ├── assets/          # Images and icons
  │   ├── components/      # Reusable UI components
  │   ├── context/         # React context providers
  │   ├── hooks/           # Custom React hooks
  │   ├── layouts/         # Layout components
  │   ├── lib/             # Utility libraries
  │   ├── pages/           # Application pages
  │   ├── App.tsx          # Main app component
  │   ├── main.tsx         # Entry point
  │   └── index.css        # Global styles
  ├── index.html           # HTML template
  ├── package.json         # Project metadata and scripts
  ├── vite.config.ts       # Vite configuration
  └── ...                  # Other config files
```

## Getting Started

1. **Install dependencies:**
   ```sh
   cd client
   pnpm install
   ```
2. **Run the development server:**
   ```sh
   pnpm dev
   ```
3. **Build for production:**
   ```sh
   pnpm build
   ```
4. **Lint the code:**
   ```sh
   pnpm lint
   ```

## Todo

1. Finish Analysis page.
2. Create a backend and link it to the frontend

## License

MIT
