import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

/* page urls */
import HomePage from './pages/home';
import ErrorPage from "./error-page";
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import PrivacyPage from './pages/privacy';
import RocksPage from './pages/rocks';
import RockTopicPage from './pages/rock-topic';
import Leaderboard from './pages/leaderboard';
import ProfilePage from './pages/profile';
import CmsPage from './pages/cms';
import TopicPage from './pages/topic';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPage />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/:user_id",
    element: <ProfilePage />,
  },
  {
    path: "/rocks",
    element: <RocksPage />,
  },
  {
    path: "rocks/:rock_id",
    element: <RockTopicPage />,
  },
  {
    path: "topic/:topic_id",
    element: <TopicPage />,
  },
  {
    path: "/cms",
    element: <CmsPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
