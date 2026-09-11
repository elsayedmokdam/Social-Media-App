<div align="center">

# Social Media App

A modern social media frontend built with React, Vite, and a REST API.

</div>

## Overview

Social Media App is a single-page application for sharing posts, interacting with other users, and managing personal profiles. It provides authenticated feed, profile, notification, suggestions, and post-detail experiences with responsive UI components and server-state management.

## Features and Operations

### Authentication and account

- Sign up and sign in.
- Guest-only access for authentication pages.
- Protected access for the main application.
- Change the account password.
- Persist and expose the authenticated user through `AuthContextProvider`.
- Sign out through the authentication flow.

### Feed and posts

- Load the home feed and all posts.
- Display posts in the feed and open a single post detail page.
- Create, update, and delete posts.
- Share posts.
- Like and unlike posts.
- Bookmark and remove bookmarks from posts.
- View post likes.
- Load posts by the selected feed tab.
- View a user’s posts from their profile.

### Comments and replies

- Load comments for a post.
- Create, update, and delete comments.
- Like and unlike comments.
- Create replies to comments.
- Load replies for a comment.

### Profiles and social interactions

- View the current user profile.
- View another user’s profile.
- Update the profile photo.
- Upload, change, and delete the profile cover photo.
- Follow and unfollow users.
- Load follow suggestions.
- Search for users and retrieve search suggestions.
- View followers and following lists through the profile interface.
- View saved/bookmarked posts.

### Notifications

- Load notifications.
- Display the unread notification count.
- Mark one notification as read.
- Mark all notifications as read.

### User experience

- Responsive feed, profile, notification, and authentication screens.
- Reusable navigation, avatar, button, image, user, profile, skeleton, and spinner components.
- Toast feedback for user actions and API results.
- Emoji picker support when creating or editing posts.
- Full-screen image viewing with a lightbox.
- Loading states and cached server data through React Query.
- React Query Devtools for inspecting queries during development.

## Application Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/signin` | Guest only | Sign in to an account |
| `/signup` | Guest only | Create an account |
| `/change-password` | Authenticated | Change the account password |
| `/suggestions` | Authenticated | Browse follow suggestions |
| `/feed` | Authenticated | View the main feed |
| `/posts/:postId` | Authenticated | View post details and interactions |
| `/notifications` | Authenticated | View and manage notifications |
| `/profile` | Authenticated | View and manage the current profile |
| `/profile/:userId` | Authenticated | View another user’s profile |
| `/settings` | Authenticated | Access account settings/password management |

`GuestRoute` prevents authenticated users from returning to guest-only screens, while `ProtectedRoute` guards the application routes that require authentication.

## Technology Stack

### Core

- **React 19** - Component-based UI development.
- **React DOM** - Browser rendering.
- **Vite** - Development server and production bundling.
- **JavaScript (ES modules)** - Application source language.
- **React Router 7** - Client-side routing and nested layouts.

### UI and styling

- **HeroUI** - Accessible UI components and provider setup.
- **Tailwind CSS 4** - Utility-first styling.
- **Tailwind CSS Vite plugin** - Tailwind integration with Vite.
- **Font Awesome** - Interface icons.
- **Framer Motion** - UI animations and transitions.
- **yet-another-react-lightbox** - Full-screen image previews.
- **emoji-picker-react** - Emoji selection in post workflows.

### Data, forms, and validation

- **Axios** - Public and authenticated HTTP clients.
- **TanStack React Query** - Server-state fetching, caching, mutations, and query invalidation.
- **TanStack React Query Devtools** - Development-time query inspection.
- **React Hook Form** - Form state and submission handling.
- **Zod** - Schema validation.
- **@hookform/resolvers** - Connects Zod schemas to React Hook Form.
- **date-fns** - Date formatting and relative date utilities.
- **react-hot-toast** - Action feedback and error notifications.

### Development tooling

- **ESLint 9** - Code quality and linting.
- **eslint-plugin-react-hooks** - React Hooks lint rules.
- **eslint-plugin-react-refresh** - Fast Refresh lint rules.
- **React Compiler Babel plugin** - React compiler integration.

## Project Structure

```text
src/
├── api/                 Axios public/private API clients
├── assets/              Images and static assets
├── components/          Reusable UI and feature components
├── context/             Global authentication context
├── hooks/               Reusable React hooks
├── layouts/             Root and feed layouts
├── pages/               Route-level page components
├── query-keys/          React Query key definitions
├── routes/              Router and route guards
├── schemas/             Validation schemas
├── services/             API operations grouped by domain
└── utilities/            Shared helpers and utility functions
```

The service layer is organized by domain: authentication, users, posts, comments and replies, notifications, and health checks. Components are organized by feature so page-level components can compose smaller reusable pieces.

## Getting Started

### Prerequisites

- Node.js 18 or newer.
- npm or another compatible Node package manager.
- Access to the backend API used by the application.

### Installation

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root and provide the backend base URL:

```env
VITE_BASE_URL=https://your-api.example.com
```

Vite exposes only variables prefixed with `VITE_` to the client. Do not place private secrets in this file.

### Run the development server

```bash
npm run dev
```

Vite will print the local URL in the terminal.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## API Integration

The application defines two Axios clients:

- `publicApi` is used for requests that do not require authentication.
- `privateApi` is used for authenticated requests and handles the authenticated API flow.

API operations are kept in `src/services` and consumed by hooks and page components. React Query manages request caching, loading states, mutations, and refreshing related data after operations such as creating posts, liking content, following users, and marking notifications as read.

## State and UI Architecture

The root application providers are composed in `App.jsx`:

1. `AuthContextProvider` supplies authentication state.
2. `QueryClientProvider` supplies TanStack Query state management.
3. `HeroUIProvider` supplies HeroUI context.
4. `RouterProvider` renders the route tree.
5. `ReactQueryDevtools` assists with development diagnostics.
6. `Toaster` displays action and error feedback.

This structure keeps authentication, server data, navigation, and notifications available throughout the application while allowing feature components to remain focused on their own UI and operations.

## Production Build

Build the application before deployment:

```bash
npm run build
```

The generated production files are written to `dist/`. The included `vercel.json` can be used with a Vercel deployment, provided the production environment contains the correct `VITE_BASE_URL` value.

## Development Notes

- Keep API calls inside the service layer instead of calling Axios directly from presentational components.
- Reuse query keys from `src/query-keys/queryKeys.js` when adding React Query operations.
- Protect new authenticated pages with `ProtectedRoute`.
- Use the existing shared components and validation schemas before introducing duplicates.
- Run `npm run lint` and `npm run build` before submitting changes.
