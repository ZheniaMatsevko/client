import React from 'react';
import {Outlet} from "react-router-dom";
import Header3 from "./header/Header3";

const Layout = () => {
    return (
        <>
            <Header3/>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    );
};

export default Layout;
