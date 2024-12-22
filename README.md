# This project created with Reactor: A Template for React + TypeScript SWC Projects (v0.1.0)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Features

- **React**: React most popular JavaScript framework.
- **TypeScript**: Type-safe development with TypeScript.
- **Vite**: Fast build tool and development server.
- **Styled-Components**: CSS-in-JS library for styling.
- **ESLint and Prettier**: Linting and formatting integration.
- **GitHub Actions**: CI/CD pipeline for automated testing and deployment.
- **Responsive Design**: Utilities for responsive design.
- **Custom Hooks**: Predefined custom hooks for common functionalities.

## Getting Started

### Installation

1. Clone the repository to current directory:

```sh
git clone https://github.com/MrCorvoDev/Reactor.git .
```

2. Install dependencies

```sh
npm install
```

3. Commands:

```sh
npm run dev # Start development
npm run dev-host # Start development with external host
npm run build # Build project
npm run lint # Lint project
npm run preview # Preview your built project
npm run format # Format all files
```

4. File System

```
Reactor/
├── github/ # Github actions
├── .vscode/ # VSCode config, recommended extensions and snippets
├── public/ # Static assets
├── src/ # Source code
│ ├── assets/ # Assets like images, fonts, etc.
│ ├── components/ # React components
│ ├── contexts/ # React contexts
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Page components
│ ├── services/ # Services
│ ├── styles/ # Styling files
│ ├── types/ # TypeScript types
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main App component
│ ├── index.tsx # Entry point
│ ├── vite-env.d.tsx # Vite types
├── .env # Environment variables
├── .env.local # Isn't in repository. Can store sensitive data
├── .gitignore # Git Ignore list
├── .prettierrc # Prettier configuration
├── eslintrc.config.js # ESLint configuration
├── index.html # HTML entry point
├── package.json # Project metadata and scripts
└── README.md # Project documentation
├── tsconfig.app.json # TS Config for app-specific code
├── tsconfig.json # Base TS settings
├── tsconfig.node.json # TS Config for Node.js-specific code
├── vite.config.ts # Vite configuration
```
