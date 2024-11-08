import React from 'react';
import {useNavigate} from 'react-router-dom';
import {User} from '../types/usersTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

interface ProfileMenuProps {
    currentUser?: User | null;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({}) => {
    const storedUserString = localStorage.getItem('currentUser');
    const user: User | null = storedUserString ? JSON.parse(storedUserString) : null;
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate(`/my`);
    };

    return (
        <>
            {user ? (
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" style={{ width: '150px' }}
                            data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faUser} /> {user?.username}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <button className="dropdown-item" type="button" onClick={() => handleNavigation()}>
                                My profile
                            </button>
                        </li>
                        <div className="dropdown-divider"></div>
                        <li>
                            <button className="dropdown-item" type="button" onClick={() => {
                                localStorage.removeItem('currentUser');
                                navigate('/');
                            }}>Logout
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="d-flex">
                    <li className="nav-item" role="presentation">
                        <a href="/" className="nav-link">Log In</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a href="/register" className="btn btn-light action-button" role="button">Sign Up</a>
                    </li>
                </div>
            )}
        </>
    );
};

export default ProfileMenu;
