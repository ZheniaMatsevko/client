import React from 'react';
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {User} from "../../types/usersTypes";
import EventService from "../../API/EventService";
import {BiCog} from "react-icons/bi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

interface EventHeadingProps {
    caption: string;
    user?: User | undefined;
    eventId: number;
    averageRating: number;
    showAverageRating:boolean
}

const EventHeading: React.FC<EventHeadingProps> = ({ showAverageRating,averageRating,eventId, user, caption }) => {
    const navigate = useNavigate();
    const handleDeleteEvent = () => {
        if (user) {
            EventService.deleteEventById(eventId)
                .then(() => {
                    toast.success('Event was deleted');
                    navigate('/events');
                })
                .catch((error) => {
                    toast.error('Failed to delete event.');
                    console.log(error)
                });
        }
    };
    return (
    <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
            <h2 className="text-3xl font-bold" >{caption.toUpperCase()}</h2>
        </div>
        <div className="row">
            {showAverageRating && (
                <div className="col-auto d-inline-block gap-1">
                    <span className="fs-5 fw-bold">{averageRating.toFixed(1)}</span>
                    <FontAwesomeIcon icon={solidStar} className="text-warning" />
                </div>
            )}
            {user && (
                <div className="dropdown col-auto d-inline-block">
                    <a className="dropdown-toggle nav-link dropdown-toggle" data-bs-toggle="dropdown"
                       aria-expanded="false" href="#">
                        <BiCog size={30} />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end" role="menu">
                        <a className="dropdown-item" role="presentation" href={`/events/${eventId}/edit`}>Edit event</a>
                        <a className="dropdown-item" role="presentation" onClick={handleDeleteEvent}>Delete event</a>
                    </div>
                </div>
            )}
        </div>
    </div>
    );
};

export default EventHeading;
