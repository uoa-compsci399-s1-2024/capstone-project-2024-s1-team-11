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
import AddTopic from "./components/cms-admin/cms-topics-add.jsx";
import EditTopic from "./components/cms-admin/cms-topics-edit.jsx";
import DeleteTopic from "./components/cms-admin/cms-topics-delete.jsx";
import EditRock from "./components/cms-admin/cms-rocks-edit.jsx";
import AddRock from "./components/cms-admin/cms-rocks-add.jsx";

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

  // CMS related pages.
  {
    path: "/cms",
    element: <CmsPage />,
  },
  {
    path: "/cms/add-topic",
    element: <AddTopic />,
  },
  {
    path: "/cms/edit-topic/:topic_id",
    element: <EditTopic />,
  },
  {
    path: "/cms/delete-topic/:topic_id",
    element: <DeleteTopic />,
  },
  {
    path: "/cms/add-rock",
    element: <AddRock />,
  },
  {
    path: "/cms/edit-rock/:rock_id",
    element: <EditRock />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
