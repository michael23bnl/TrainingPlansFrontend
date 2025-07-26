import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './app/layout.tsx'
import { NotFoundPage } from './app/not-found.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './store/contexts/AuthContext.tsx'
import ProtectedRoute from './components/ProtectedRoute/protectedroute.tsx'
import { ChatPage } from './pages/chat.tsx'
import { FavoritePlansPage } from './pages/favoriteplans.tsx'
import { CompletedPlansPage } from './pages/completedplans.tsx'
import { LoginPage } from './pages/login.tsx'
import { MyPlansPage } from './pages/myplans.tsx'
import { PreparedPlansPage } from './pages/preparedplans.tsx'
import { PlanConstructorPage } from './pages/plansconstructor.tsx'
import { RegistrationPage } from './pages/register.tsx'
import { StatisticsPage } from './pages/statistics.tsx'
import { HomePage } from './pages/home.tsx'
import { UnauthorizedPage } from './app/unauthorized.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true, // сработает при переходе на "/"
        element: <HomePage />,
      },
      {
        path: "/preparedplans",
        element: <PreparedPlansPage />
      },
      {
        path: "/myplans",
        element: <ProtectedRoute><MyPlansPage /></ProtectedRoute>
      },
      {
        path: "/favoriteplans",
        element: <ProtectedRoute><FavoritePlansPage /></ProtectedRoute>
      },
      {
        path: "/completedplans",
        element:  <ProtectedRoute><CompletedPlansPage /></ProtectedRoute>
      },
      {
        path: "/plansconstructor",
        element:  <ProtectedRoute><PlanConstructorPage /></ProtectedRoute>
      },
      {
        path: "/chat",
        element:  <ProtectedRoute><ChatPage /></ProtectedRoute>
      },
      {
        path: "/register",
        element: <RegistrationPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      
      {
        path: "/statistics",
        element:  <ProtectedRoute><StatisticsPage /></ProtectedRoute>
      },
      {
        path: "/me",
        element: ""
      },
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>  
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
