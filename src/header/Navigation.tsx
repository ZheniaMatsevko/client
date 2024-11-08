import React from 'react';
import NavigationLink from './NavigationLink';
import ProfileMenu from "./ProfileMenu";

const Navigation = () => {
    return (
        <div className="collapse navbar-collapse justify-content-end" id="navcol-1">
            <ul className="nav navbar-nav">
                <NavigationLink title={"Events"} path={"/events"}/>
                <NavigationLink title={"Organise"} path={"/organise"}/>
                <ProfileMenu/>
            </ul>
        </div>
    );
};

export default Navigation;
