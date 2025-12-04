import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import TweetDetailsPage from './pages/TweetDetailsPage.jsx'
import AddPostPage from './pages/AddPostPage.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/tweet/:id",
        element: <TweetDetailsPage />
      },
      {
        path: "/addpost",
        element: <AddPostPage />
      }
  ]

}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
