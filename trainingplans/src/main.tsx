import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './app/layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './store/contexts/AuthContext.tsx'
import { ChatPage } from './pages/chat.tsx'
import { FavoritePlansPage } from './pages/favoriteplans.tsx'
import { LoginPage } from './pages/login.tsx'
import { MyPlansPage } from './pages/myplans.tsx'
import { PreparedPlansPage } from './pages/preparedplans.tsx'
import { PlanConstructorPage } from './pages/plansconstructor.tsx'
import { RegistrationPage } from './pages/register.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // сработает при переходе на "/"
        element: <div className=''>Hello World</div>,
      },
      {
        path: "/preparedplans",
        element: <PreparedPlansPage />
      },
      {
        path: "/myplans",
        element: <MyPlansPage />
      },
      {
        path: "/favoriteplans",
        element: <FavoritePlansPage />
      },
      {
        path: "/plansconstructor",
        element: <PlanConstructorPage />
      },
      {
        path: "/chat",
        element: <ChatPage />
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
        element: ""
      },
      {
        path: "/me",
        element: ""
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
