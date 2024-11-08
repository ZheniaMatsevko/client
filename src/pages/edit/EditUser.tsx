import React, {useEffect} from 'react';
import UserForm from "../../components/register/UserForm";
import {User} from "../../types/usersTypes";
import {useNavigate} from "react-router-dom";

const EditUser = () => {
    const storedUserString = localStorage.getItem("currentUser");
    const currentUser: User = storedUserString ? JSON.parse(storedUserString) : null;
    const navigate = useNavigate();

    console.log(currentUser);
    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ paddingBottom: "300px" }}>
            <div className="w-50 container-sm bg-white p-4 rounded">
                <h1 className="text-center">EDIT PROFILE</h1>
                <div className="row">
                    <UserForm />
                </div>
            </div>
        </div>
    );
}

export default EditUser;
