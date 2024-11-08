import React, {useCallback, useState} from 'react';
import {BiCog} from "react-icons/bi";
import {User} from "../../types/usersTypes";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import UserService from "../../API/UserService";
import {ChangePasswordModal} from "../modals/ChangePasswordModal";

interface UserHeadingProps {
    name: string;
    user?: User | undefined;
}

const UserHeading: React.FC<UserHeadingProps> = ({ name, user }) => {
    const navigate = useNavigate();
    const handleDeleteProfile = () => {
        if (user) {
            UserService.deleteUserById(user.id)
                .then(() => {
                    localStorage.removeItem('currentUser');
                    toast.success('Your account was deleted');
                    navigate('/');
                })
                .catch((error) => {
                    toast.error('Failed to delete account.');
                    console.log(error)
                });
        }
    };
    const [isOpenPassword, setIsOpenPassword] = useState(false);
    const toggleOpenPassword = useCallback(() => {

        setIsOpenPassword((value) => !value);
    }, []);

    return (
        <>
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <h2 className="text-3xl font-bold">{name.toUpperCase()}</h2>
            </div>
            {user && (
                <div className="dropdown">
                    <a className="dropdown-toggle nav-link dropdown-toggle" data-bs-toggle="dropdown"
                       aria-expanded="false" href="#">
                        <BiCog size={30} />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end" role="menu">
                        <a className="dropdown-item" role="presentation" href="/my/edit">Edit profile</a>
                        <a className="dropdown-item" role="presentation" onClick={toggleOpenPassword}>Change password</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" role="presentation" onClick={handleDeleteProfile}>Delete profile</a>
                    </div>
                </div>
            )}
        </div>
            <ChangePasswordModal isOpen={isOpenPassword} toggle={toggleOpenPassword}/>
        </>
    );
};

export default UserHeading;
