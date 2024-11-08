import React from 'react';

interface NavigationLinkProps {
    title: string;
    path: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ title, path }) => {
    return (
        <li className="nav-item" role="presentation">
            <a className="nav-link" href={path}>{title}</a>
        </li>
    );
};

export default NavigationLink;
