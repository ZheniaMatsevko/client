import React from 'react';
import UserForm from "../../components/register/UserForm";

const Register = () => {

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ paddingBottom: "300px" }}>
            <div className="w-50 container-sm bg-white p-4 rounded">
                <h1 className="text-center">REGISTRATION</h1>
                <div className="row">
                    <UserForm />
                </div>
            </div>
        </div>
    );
}

export default Register;
