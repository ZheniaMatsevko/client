import {createBrowserRouter} from "react-router-dom";
import Layout from "./layout";
import App from "./pages/App";
import Events from "./pages/event/Events";
import Event from "./pages/event/Event";
import Register from "./pages/register/Register";
import Profile from "./pages/user/Profile";
import React from "react";
import Organise from "./pages/register/Organise";
import EditEvent from "./pages/edit/EditEvent";
import EditUser from "./pages/edit/EditUser";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        //errorElement: <Error/>,
        children: [
            {
              element: <App/>,
              index: true
            },
            {
                path: "/events",
                element:<Events/>
            },
            {
                path: "/events/:id",
                element: <Event/>
            },
            {
                path: "/events/:id/edit",
                element: <EditEvent/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/my-events/:userId",
                element: <Events/>
            },
            {
                path: "/my",
                element: <Profile/>
            },
            {
                path: "/my/edit",
                element: <EditUser/>
            },
            {
                path: "/profile/:id",
                element: <Profile/>
            },
            {
                path: "/organise",
                element: <Organise/>
            }
        ]
    }
]);
