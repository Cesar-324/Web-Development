# UniLibrary

A modern university book catalog web application that allows students to browse books, request loans, and manage their borrowed titles. Built with React, Redux Toolkit, and Tailwind CSS.

## Live Demo

> Deploy the project to obtain a live URL. See the [Setup](https://web-development-owdinwjw6-cesar-324s-projects.vercel.app) section to run it locally.

## Features

- **Book Catalog** — Browse and search books powered by the Google Books API
- **Book Details** — View full information for any title, including description and publication date
- **User Authentication** — Secure login flow with JWT token management via Redux
- **Book Requests** — Authenticated users can request books with a confetti celebration on success
- **My Loans** — View and manage all currently borrowed books
- **Return Books** — Return any borrowed book with a smooth animated removal from the list
- **Dark / Light Mode** — System-aware theme toggle persisted through the session
- **Responsive Design** — Mobile-first layout with a collapsible hamburger navigation
- **Skeleton Loaders** — Animated placeholder cards while data is being fetched
- **Toast Notifications** — Non-blocking feedback messages for all key user actions

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 + TypeScript |
| State Management | Redux Toolkit |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| Build Tool | Vite 8 |
| API | Google Books API |
| Notifications | react-hot-toast |
| Animations | @formkit/auto-animate |
| Confetti | canvas-confetti |
| Testing | Vitest + Testing Library |

## Project Structure

```
src/
├── components/
│   ├── books/
│   │   ├── BookCard/       # Individual book card component
│   │   └── BookGrid/       # Responsive grid of BookCards
│   ├── layout/
│   │   ├── AppLayout.tsx   # Root layout with navbar and outlet
│   │   └── SearchBar/      # Search input and submit
│   ├── pages/
│   │   ├── Catalog.tsx     # Home page — book grid with search
│   │   ├── BookDetails.tsx # Full book detail + request action
│   │   ├── MyLoans.tsx     # Borrowed books list with return action
│   │   └── Login.tsx       # Authentication form
│   └── ui/
│       └── SkeletonLoader.tsx  # Reusable skeleton placeholders
├── context/
│   └── ThemeContext.tsx    # Dark/light mode context
├── hooks/
│   ├── useFetch.ts         # Generic data-fetching hook
│   └── useBookSearch.ts    # Book search with Redux caching
├── services/
│   └── bookService.ts      # Google Books API helpers + BookModel
├── store/
│   ├── store.ts            # Redux store configuration
│   ├── authSlice.ts        # Authentication state
│   ├── loansSlice.ts       # Borrowed books state
│   └── searchSlice.ts      # Search results cache
└── types/
    └── types.ts            # Shared TypeScript interfaces
```

## Setup

### Prerequisites

- Node.js ≥ 18
- [Yarn](https://yarnpkg.com/) (the project uses Yarn 4 via Corepack)
- A [Google Books API key](https://developers.google.com/books/docs/v1/using#APIKey)
- A running instance of the authentication backend (see `.env` configuration)

### Environment Variables

Create a `.env` file at the project root with the following variables:

```env
VITE_API_KEY_GOOGLE_BOOK=your_google_books_api_key
VITE_API_URL=http://localhost:3001
```

| Variable | Description |
|---|---|
| `VITE_API_KEY_GOOGLE_BOOK` | Google Books API key for fetching book data |
| `VITE_API_URL` | Base URL of the authentication backend |

### Installation

```bash
# Clone the repository
git clone https://github.com/Cesar-324/Web-Development.git
cd Web-Development

# Install dependencies
yarn install
```

### Running Locally

```bash
yarn dev
```

The app will be available at `http://localhost:5173`.

### Running Tests

```bash
# Run all tests once
yarn test:run

# Run tests in watch mode
yarn test:watch

# Run with coverage report
yarn test:coverage
```

### Building for Production

```bash
yarn build
```

The production bundle will be output to the `dist/` directory.

## Default Credentials

The app connects to a local authentication backend. Use the following credentials with a running server:

| Field | Value |
|---|---|
| Email | `admin@jala.edu` |
| Password | `123456` |

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start the Vite development server |
| `yarn build` | Compile TypeScript and build for production |
| `yarn preview` | Serve the production build locally |
| `yarn lint` | Run ESLint across the project |
| `yarn test:run` | Run the full test suite once |
| `yarn test:watch` | Run tests in interactive watch mode |
| `yarn test:coverage` | Generate a code coverage report |
