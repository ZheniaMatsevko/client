import React from 'react';
import { NavLink } from "react-router-dom";

interface EmptyProps {
    message: string;
    link: string;
    dist: string;
}

const Empty: React.FC<EmptyProps> = ({ message, link, dist }) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 text-white">
            <p className="text-3xl font-weight-bold">{message}</p>
            <NavLink to={link} className="text-decoration-none text-white">
                Click here to return to the {dist}
            </NavLink>
        </div>
    );
};

export default Empty;
