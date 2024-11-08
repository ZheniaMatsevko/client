import React from 'react';
import {User} from "../../types/usersTypes";

interface UserDescriptionProps {
    email: string;
    username: string;
    user?: User | undefined;
}

const UserDescription: React.FC<UserDescriptionProps> = ({ user, username, email }) => {
    return (
        <>
            <div className="row my-3">
                <div className="col">
                    <p className="text-gray" style={{textDecoration: 'underline' }}>@{username}</p>
                    <p><strong>Email:</strong> {email}</p>
                </div>
            </div>
        </>
    );
};

export default UserDescription;
