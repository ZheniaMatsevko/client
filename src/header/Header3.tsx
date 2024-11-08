import React from 'react';
import Navigation from "./Navigation";

const Header3 = () => {
    // @ts-ignore
    return (
        <div>
            <div className="header-dark">
                <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
                    <div className="container-fluid">
                        <a  className="navbar-brand" href="/events">
                            Eventure
                        </a>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Navigation/>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header3;
