import React, {useEffect, useState} from 'react';
import {Event as EventType} from '../../types/eventTypes';
import EventHeading from "../../components/event/EventHeading";
import EventDescription from "../../components/event/EventDescription";
import {useNavigate, useParams} from "react-router-dom";
import {User} from "../../types/usersTypes";
import EventService from "../../API/EventService";
import {toast, Toaster} from 'react-hot-toast';
import Empty from "../../empty";
import {convertToInt} from "../../utils/functions";
import {Review} from "../../types/reviewTypes";
import ReviewService from "../../API/ReviewService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import ReviewForm from "../../components/review/ReviewForm";
import EmptyList from "../../components/lists/EmptyList";
import UserLink from "../../components/UserLink";
import {calculateAverageRating} from "../../utils/ratingUtils";


const Event = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const storedUserString = localStorage.getItem("currentUser");
    const currentUser: User = storedUserString ? JSON.parse(storedUserString) : null;
    const [event, setEvent] = useState<EventType>();
    const [isRegistered, setIsRegistered] = useState<boolean>(false); // State to track registration status
    const [vacantPlaces, setVacantPlaces] = useState(-1);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        if(event && event.capacity){
            setVacantPlaces(event.capacity - event.participants.length);
        }
    }, [event]);
    useEffect(() => {
        if (id) {
            EventService.getEventById(convertToInt(id))
                .then((data) => {
                    setEvent(data);
                    if (currentUser && data?.participants.some((participant: User) => participant.id === currentUser.id)) {
                        setIsRegistered(true); // Set registration status to true if user is registered for the event
                    } else {
                        setIsRegistered(false);
                    }
                    if(data.capacity && data.capacity>0){
                        setVacantPlaces(data.capacity - data.participants.length);
                    }
                    setReviews(data.reviews);
                })
                .catch((error) => {
                    console.error('Error getting data from the server:', error)
                    navigate(`/events`);
                    toast.error('Event not found');
                });
        }
    }, [id]);

    function handleRegister() {
        if (currentUser && id) {
            EventService.registerUserForEvent(currentUser.id, convertToInt(id))
                .then(() => {
                    setIsRegistered(true);
                    event?.participants.push(currentUser);// Update registration status after successful registration
                    toast.success('Registered for the event');

                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }
    const averageRating = calculateAverageRating(reviews || []);

    const handleDeleteReview = (id: number) => {
        console.log(reviews);
        console.log(id);
        if (currentUser && event) {
            ReviewService.deleteReviewById(event.id, id)
                .then(() => {
                    toast.success('Review was deleted');
                    setReviews(reviews.filter((dept) => dept.id !== id));
                })
                .catch((error) => {
                    toast.error('Failed to delete review.');
                    console.log(error)
                });
        }
    };
    function handleUnregister() {
        if (currentUser && id) {
            EventService.unregisterUserFromEvent(currentUser.id, convertToInt(id))
                .then(() => {
                    setIsRegistered(false);
                    setEvent(prevEvent => ({
                        ...prevEvent!,
                        participants: prevEvent?.participants.filter(attendee => attendee?.id !== currentUser.id) || []
                    }));
                    toast.success('Unregistered from the event');
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }
    const [showAllReviews, setShowAllReviews] = useState(false);

    const renderStars = (rating: number) => {
        const totalStars = 10;
        const filledStars = Math.round((rating / totalStars) * 10);

        return (
            <>
                {[...Array(filledStars)].map((_, index) => (
                    <FontAwesomeIcon icon={solidStar} key={index} className="text-warning" />
                ))}
                {[...Array(totalStars - filledStars)].map((_, index) => (
                    <FontAwesomeIcon icon={regularStar} key={filledStars + index} className="text-secondary" />
                ))}
            </>
        );
    };


    const handleClickToggle = () => {
        setShowAllReviews(!showAllReviews);
    };

    const visibleRatings = showAllReviews ? event?.reviews : event?.reviews.slice(0, 5);

    const renderReviews = () => {
        return <>
            {currentUser && event && (
                <ReviewForm currentEventId={event.id} currentUser={currentUser} onRatingAdded={(review: Review) => {
                    // Update the state to include the newly added review
                    setEvent(prevEvent => {
                        if (!prevEvent) return prevEvent;
                        console.log("Review" + review);// Return null if prevSchool is undefined
                        const updatedReviews = [review, ...prevEvent.reviews];
                        setReviews(updatedReviews);
                        return { ...prevEvent, reviews: updatedReviews };
                    });

                }}/>
            )}
            {reviews.length === 0 ? (
                <EmptyList value={"reviews"}/>
            ) : (
                <div style={{ width: '99%' }} className="p-1 mt-4">
                    <ul className="list-group">
                        {reviews.map((rating, index) => (
                            <li
                                key={rating.id}
                                className="list-group-item  position-relative"
                            >
                                {currentUser && rating.author.id === currentUser.id && (
                                    <button
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                                        onClick={() => handleDeleteReview(rating.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                                <p className="text-secondary mb-0">
                                    Rated by <UserLink id={rating.author.id} username={rating.author.username} />
                                </p>
                                <p className="text-lg mb-1">
                                    {renderStars(rating.rating)} ({rating.rating}/10)
                                </p>
                                <p className="text-dark">{rating.comment}</p>
                            </li>
                        ))}
                        {reviews.length > 5 && (
                            <li className="mt-2">
                                <button
                                    className="text-secondary text-base underline cursor-pointer"
                                    onClick={handleClickToggle}
                                >
                                    {showAllReviews ? 'Show Less' : 'Show More'}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </>;
    }

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ paddingBottom: "100px" }}>
            {event ? (
                <>
                    <div className="w-75 container-sm bg-white p-4 rounded">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={event?.imageUrl} alt={event?.caption} style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'cover' }} />
                            </div>
                            <div className="col-md-8">
                                <div className="flex flex-row justify-between align-items-top pe-1">
                                    <EventHeading
                                        averageRating={averageRating}
                                        showAverageRating={event.reviews.length>0}
                                        user={currentUser && currentUser.id===event.organiser.id ? currentUser : undefined}
                                        eventId={event.id}
                                        caption={event.caption} />
                                </div>
                                <EventDescription
                                    userId={event.organiser.id}
                                    username={event.organiser.username}
                                    online={event.online}
                                    capacity={event.capacity === 0 ? undefined : event.capacity}
                                    price={event.price}
                                    address={event.address}
                                    dateTime={event.dateTime}
                                    vacantPlaces={event.capacity ?  event.capacity- event.participants.length : undefined}
                                />
                                { (!currentUser || (event.organiser.id !== currentUser.id)) && (
                                    <>
                                        {isRegistered ? (
                                            <button className="btn btn-danger btn-lg col-md-12" onClick={handleUnregister} style={{color: '#fff'}}>
                                                Unregister
                                            </button>
                                        ) : (
                                            <button disabled={event.capacity ? (event.capacity - event.participants.length <= 0 || !currentUser) : false}  className="btn btn-info btn-lg col-md-12" onClick={handleRegister} style={{color: '#fff'}}>
                                                Take Part
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="row justify-content-start">
                            <div className="col-md-12">
                                <h4 className="text-lg font-semibold mb-2">Description</h4>
                                <p>{event.description}</p>
                            </div>
                        </div>
                        <div className="row justify-content-start mt-3">
                            <div className="col-md-12">
                                {renderReviews()}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Empty message={"There's no such event here"} link={`/events`} dist={'all events'} />
            )}
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </div>
    );
};

export default Event;
