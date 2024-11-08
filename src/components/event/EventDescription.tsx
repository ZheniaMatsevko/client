import React from 'react';
import {BiCalendar, BiGlobe, BiMap} from 'react-icons/bi';
import UserLink from "../UserLink";
import { Address } from "../../types/addressTypes";

interface EventDescriptionProps {
    dateTime: Date;
    vacantPlaces?: number;
    capacity?: number;
    address: Address;
    price: number;
    online: boolean;
    userId: number;
    username: string
}

const EventDescription: React.FC<EventDescriptionProps> = ({   username, userId,online, dateTime,capacity, address, vacantPlaces, price }) => {
    return (
        <div className="row mb-3">
            <div className="col">
                <UserLink id={userId} username={username}/>
                <p className="mt-2"><BiCalendar/> {dateTime.toLocaleString()}</p>
                {online ?
                    <p><BiGlobe/> ONLINE</p>
                    :
                    <p><BiMap/> {address.country}, {address.city}, {address.address}</p>
                }
                <p><strong>Price:</strong> {price}₴</p>
                {capacity && vacantPlaces && (
                    <p><strong>Vacant Places:</strong> {vacantPlaces}/{capacity}</p>
                )}
            </div>
        </div>
    );
};

export default EventDescription;
