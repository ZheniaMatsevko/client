import React, { useState } from 'react';
import { Event } from '../../types/eventTypes';
import {useNavigate} from "react-router-dom";
import {BiCalendar, BiMap} from "react-icons/bi";
import {parseISO} from "date-fns";
import {calculateAverageRating} from "../../utils/ratingUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as solidStar} from "@fortawesome/free-solid-svg-icons";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const averageRating = calculateAverageRating(event.reviews || []);

    const { id, caption,online, price, dateTime, imageUrl, address } = event;
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const dateTimeParsed = parseISO(dateTime.toLocaleString());
    const handleClick = () => {
            navigate(`/events/${id}`);
    };

    return (
        <div
            className={`card shadow mb-4`}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative', // Ensure positioning context for absolute positioning
                borderRadius: '8px',
                overflow: 'hidden',
                border: `1px solid ${isHovered ? '#fff' : '#000'}`,
                transition: 'background-color 0.3s, border-color 0.3s',
                height: '315px', // Reduced height
                opacity: isHovered ? '0.8' : '1', // Custom opacity for hover
            }}
        >
            <img
                src={imageUrl}
                className="card-img-top"
                alt={caption}
                style={{
                    objectFit: 'cover',
                    height: '210px', // Ensure image covers the entire height
                    transition: 'transform 0.3s', // Add transition for smooth effect
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Increase size on hover
                }}
            />
            <div
                className="eventPrice-flag"
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#3b9d3b',
                    color: '#fff',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '0.8rem',
                    zIndex: 999, // Ensure flag appears above other content
                }}
            >
                {price===0.0 ? "Free" : `${price}₴`}
            </div>
            {event.reviews.length > 0 && (
                <div
                    className="eventPrice-flag"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: '#fff',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '0.8rem',
                        zIndex: 999, // Ensure flag appears above other content
                    }}
                >

                    <div className="col-auto d-inline-block gap-1">
                        <span className="fs-6 fw-bold">{averageRating.toFixed(1)}</span>
                        <FontAwesomeIcon icon={solidStar} className="text-warning" />
                    </div>
                </div>
            )}
            <div className="card-body">
                <h5 className="card-title"
                    style={{marginBottom: '10px', lineHeight: '1.2', fontSize: '1rem'}}>{caption}</h5>
                <p className="card-text text-muted mb-2" style={{
                    lineHeight: '1',
                    fontFamily: 'Arial, sans-serif', // Change font family
                    fontSize: '0.9rem', // Change font size
                    color: '#666', // Change font color
                }}><BiMap/> {online ? "ONLINE" : (address.country + ", " + address.city + ", " + address.address)}</p>
                <p className="card-text text-muted mb-0" style={{
                    lineHeight: '1',
                    fontFamily: 'Arial, sans-serif', // Change font family
                    fontSize: '0.9rem', // Change font size
                    color: '#666', // Change font color
                }}><BiCalendar/> {dateTimeParsed.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default EventCard;
