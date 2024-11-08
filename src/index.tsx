import React from 'react';
import {createRoot} from "react-dom/client";
import {router} from "./routing";
import {RouterProvider} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css';

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
