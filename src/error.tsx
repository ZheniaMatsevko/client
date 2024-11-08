import React from 'react';
import {NavLink} from "react-router-dom";

const Error = () => {
    return (
        <div className={'flex flex-col space-y-4 justify-center items-center mt-72'}>
            <p className={'text-3xl font-bold'}>Sorry something went wrong :(</p>
            <NavLink to={`/`} className="underline underline-offset-2 text-gray-400">
                Click here to return to the main page
            </NavLink>
        </div>
    );
};

export default Error;
