# User App Frontend

Modern authentication UI built with React, TypeScript, and Vite. The app provides registration and login flows, manages authenticated user state with Zustand, and surfaces session-aware pages such as the dashboard and profile.

## Features

1. **Auth flows** – Login and registration forms backed by `@tanstack/react-query` mutations.
2. **Persistent user store** – Zustand store persisted to `localStorage` for seamless refresh handling.
3. **Session bootstrap** – `/auth/me` check on load keeps the UI in sync with the backend session (via cookies and `withCredentials`).
4. **Responsive UI** – Tailwind-based layout with reusable `Card`, `Button`, `Input`, and `Alert` components.
5. **Protected experience** – Logged-in users see the dashboard, profile menu, and logout controls; visitors toggle between forms.

## Tech Stack

| Layer              | Packages |
|--------------------|----------|
| Framework          | React 19 + Vite 7 + TypeScript 5 |
| State & Data       | Zustand (persist middleware), @tanstack/react-query |
| Routing            | react-router-dom 7 |
| UI / Styling       | Tailwind CSS 4, shadcn-inspired UI primitives, lucide-react icons |
| HTTP Client        | Axios (pre-configured in `src/lib/axios.ts`) |

## Project Structure

```
src/
├─ App.tsx               # Entry layout + auth flow switcher
├─ main.tsx              # React root w/ QueryClient + Router
├─ Store/userStore.ts    # Zustand persistent store
├─ Pages/
│  ├─ Dashboard.tsx
│  └─ Profile.tsx
├─ components/
│  ├─ NavBar.tsx, Footer.tsx
│  ├─ LoginForm.tsx, RegisterForm.tsx
│  └─ ui/                # Button, Card, Input, Alert, Spinner
└─ lib/axios.ts          # Axios instance (base URL + credentials)
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended LTS)
- pnpm / npm / yarn (examples below use npm)
- Backend API running and reachable at `http://localhost:7000`

### Installation

```bash
git clone https://github.com/mbuvi254/user_app_frontend.git
cd user_app_frontend
npm install
```

### Environment

`src/lib/axios.ts` currently hardcodes the API base URL. Update the `baseURL` value or refactor to read from `import.meta.env.VITE_API_URL` if you prefer environment-based configuration.

### Scripts

| Command        | Description |
|----------------|-------------|
| `npm run dev`  | Start Vite dev server with HMR |
| `npm run build`| Type-check and generate production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Authentication Flow

1. On load, `App.tsx` calls `GET /auth/me` to detect an active session. Success populates the Zustand store via `setUser`; failure clears it.
2. `LoginForm` and `RegisterForm` submit against `/auth/login` and `/auth/register` respectively, displaying server errors through `Alert` components.
3. On login success, the returned payload is saved via `useUserStore.getState().setUser`, unlocking the dashboard.
4. `NavBar` exposes a HeadlessUI dropdown for profile navigation and logout (`POST /auth/logout`).

## Extending

- **Routing** – Wrap new pages in `Routes`/`Route` inside `App.tsx` and gate them based on `useUserStore` data.
- **API client** – Add interceptors or token headers within `src/lib/axios.ts` if migrations to token-based auth occur.
- **UI components** – Add more primitives under `src/components/ui` to keep styling consistent.

## License

MIT © 2025 Mbuvi254
