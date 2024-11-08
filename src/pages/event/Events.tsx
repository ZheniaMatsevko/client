import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {User} from "../../types/usersTypes";
import {Event} from '../../types/eventTypes';
import {Toaster} from "react-hot-toast";
import EventsList from "../../components/lists/EventsList";
import EventService from "../../API/EventService";
import {convertToInt} from "../../utils/functions";

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const { userId } = useParams();
    const storedUserString = localStorage.getItem("currentUser");
    const currentUser: User | null = storedUserString ? JSON.parse(storedUserString) : null;

    useEffect(() => {
        if (userId) {
            EventService.getEventsWhereTakesPart(convertToInt(userId))
                .then(data => {
                    console.log(data);
                    setEvents(data);
                })
                .catch(error => console.error('Error fetching user events:', error));
        } else {
            fetchEvents();
        }
    }, [userId]);
    const fetchEvents = () => {
        EventService.getAllEvents()
            .then(data => {
                setEvents(data);
            })
            .catch(error => console.error('Error fetching all events:', error));
    };

    return (
        <div className="container mx-32 bg-black">
            {/* Margin top before "Events" header */}
            {
                (userId && currentUser?.id === convertToInt(userId)) ?
                    <>
                        <h2 className="text-white text-2xl font-bold mt-4 mb-4 border-b-2 border-white"
                            style={{ fontFamily: 'Bitter, serif', borderBottom: '2px solid white' }}>My Events</h2>
                        {
                            (events && events.length === 0) && (
                                <h3 className="text-white mb-4" style={{ fontFamily: 'Bitter, serif' }}>
                                    You haven't registered for any events yet.
                                </h3>
                            )
                        }
                    </> :
                    <>
                        <h2 className="text-white text-2xl font-bold mt-4 mb-4 border-b-2 border-white"
                            style={{ fontFamily: 'Bitter, serif', borderBottom: '2px solid white' }}>Events</h2>
                    </>
            }

            {/* Gap before EventsList */}
            <div className="mb-8"></div>
            {events && events.length > 0 ? (
                <>
                    <EventsList events={events} />
                </>
                ) : (
                <div className="text-white fs-5">
                    Events not found.
                </div>
            )}
            <Toaster position="top-center" reverseOrder={true} />
        </div>
    );
};

export default Events;
