import React from 'react';
import EventCard from '../listings/EventCard';
import { Event } from '../../types/eventTypes';

const EventList: React.FC<{ events: Event[] }> = ({ events }) => {
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {events.map(event => (
                    <div key={event.id} className="col">
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
