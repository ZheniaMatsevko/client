import {useNavigate, useParams} from "react-router-dom";
import {User} from "../../types/usersTypes";
import React, {useEffect, useState} from "react";
import {convertToInt} from "../../utils/functions";
import {toast, Toaster} from "react-hot-toast";
import Empty from "../../empty";
import UserService from "../../API/UserService";
import UserHeading from "../../components/user/UserHeading";
import UserDescription from "../../components/user/UserDescription";
import {Event} from '../../types/eventTypes';
import EventService from "../../API/EventService";
import EventsList from "../../components/lists/EventsList";
import EmptyList from "../../components/lists/EmptyList";

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const storedUserString = localStorage.getItem("currentUser");
    const currentUser: User = storedUserString ? JSON.parse(storedUserString) : null;
    const [user, setUser] = useState<User>();
    const [selectedOption, setSelectedOption] = useState<string>("Organised");
    const [organisedEvents, setOrganisedEvents] = useState<Event[]>([]);
    const [takesPartEvents, setTakesPartEvents] = useState<Event[]>([]);

    useEffect(() => {
        if (id) {
            UserService.getUserById(convertToInt(id))
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error getting data from the server:', error)
                    navigate(`/`);
                    toast.error('User not found');
                });
        }else if(currentUser){
            UserService.getUserById(currentUser.id)
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error getting data from the server:', error)
                    navigate(`/`);
                    toast.error('User not found');
                });
            EventService.getEventsWhereTakesPart(currentUser.id)
                .then((data) => {
                    setTakesPartEvents(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error getting data from the server:', error)
                    toast.error('Events not found');
                });
        }

        if(currentUser || id){
            EventService.getEventsByOrganiserId((currentUser && !id) ? currentUser.id : convertToInt(id))
                .then((data) => {
                    setOrganisedEvents(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error getting data from the server:', error)
                    toast.error('Events not found');
                });
        }
    }, [id]);

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    }

    const renderContent = () => {
        switch (selectedOption) {
            case "Organised":
                return <> {organisedEvents.length===0 ?
                    <EmptyList value={"events"}/>
                    :
                    <EventsList events={organisedEvents}/>
                }</>;
            case "Taking Part":
                return <> {takesPartEvents.length===0 ?
                    <EmptyList value={"events"}/>
                    :
                    <EventsList events={takesPartEvents}/>
                }</>;
            default:
                return <div>Nothing chosen</div>;
        }
    }

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ paddingBottom: "100px" }}>
            {user ? (
                <>
                    <div className="w-75 container-sm bg-white p-4 rounded">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={user.profileImageUrl} alt={user.username} style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'cover' }} />
                            </div>
                            <div className="col-md-9">
                                <div className="flex flex-row justify-between align-items-top">
                                    <UserHeading name={user.firstname +' '+ user.lastname} user={currentUser && currentUser.id===user.id ? user : undefined}/>
                                </div>
                                <UserDescription
                                    username={user.username}
                                    email={user.email}
                                    user={currentUser && currentUser.id===user.id ? user : undefined}
                                />
                            </div>
                        </div>
                        {currentUser && currentUser.id===user.id && (
                            <div className="row justify-content-start mt-3">
                                <div className="col-md-12">
                                    <h4 className="text-lg font-semibold mb-2">Events</h4>
                                </div>
                            </div>
                        )}

                        <div className="row justify-content-start">
                            <div className="col-auto d-inline-block">
                                <a
                                    className={selectedOption === "Organised" ?  "text-dark fs-4": "text-underline text-dark fs-4"}
                                    onClick={() => handleOptionChange("Organised")}
                                >
                                    Organised
                                </a>

                            </div>
                            {currentUser && currentUser.id===user.id && (
                                <div className="col-auto d-inline-block">
                                    <a
                                        className={selectedOption === "Taking Part" ?  "text-dark fs-4": "text-underline text-dark fs-4"}
                                        onClick={() => handleOptionChange("Taking Part")}
                                    >
                                        Taking Part
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className="row justify-content-start mt-3">
                            <div className="col-md-12">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Empty message={"There's no such user"} link={`/`} dist={'start page'} />
            )}
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </div>
    )
}
export default Profile;