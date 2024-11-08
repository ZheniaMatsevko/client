import React, {useEffect} from 'react';
import {User} from "../../types/usersTypes";
import {useNavigate} from "react-router-dom";
import EventForm from "../../components/event/EventForm";

const EditEvent = () => {
    const storedUserString = localStorage.getItem("currentUser");
    const currentUser: User = storedUserString ? JSON.parse(storedUserString) : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ paddingBottom: "300px" }}>
            <div className="w-75 container-sm bg-white p-4 rounded">
                <h1 className="text-center">EDIT EVENT</h1>
                <div className="row">
                    <EventForm />
                </div>
            </div>
        </div>
    );
}

export default EditEvent;
