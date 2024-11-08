import { Address } from "./addressTypes";
import {User} from "./usersTypes";
import {Review} from "./reviewTypes";
export interface NewEvent {
    caption: string;
    description: string;
    dateTime: Date;
    address: Address;
    price: number;
    capacity?: number;
    online: boolean;
    participants: User[];
    organiser: User;
    reviews: Review[]
}
export interface Event extends NewEvent{
    id:number;
    imageUrl: string;
}

/*export const events: Event[] = [
    {
        _id: 1,
        title: "New Year Party",
        description: "It is an amazing party that everyone will enjoy",
        startTime: new Date('2024-12-31T20:00:00'), // Example start time: December 31, 2024, 8:00:00 PM
        endTime: new Date('2025-01-01T03:00:00'), // Example end time: January 1, 2025, 3:00:00 AM
        address: addresses[0],
        price: 2000,
        isOnline: false,
        capacity: 10,
        attendees: [],
        imageURL: process.env.PUBLIC_URL + '/images/1.jpg'
    },
    {
        _id: 2,
        title: "Halloween Zumba evening",
        description: "It is an amazing party that everyone will enjoy It is an amazing party that everyone will enjoy It is an amazing party that everyone will enjoy It is an amazing party that everyone will enjoy It is an amazing party that everyone will enjoy It is an amazing party that everyone will enjoy",
        startTime: new Date('2024-06-31T10:00:00'), // Example start time: December 31, 2024, 8:00:00 PM
        endTime: new Date('2024-11-01T03:00:00'), // Example end time: January 1, 2025, 3:00:00 AM
        address: addresses[1],
        price: 0.0,
        isOnline: true,
        capacity: 10,
        attendees: [],
        imageURL: process.env.PUBLIC_URL + '/images/2.jpg'
    },
    {
        _id: 3,
        title: "Autumn Fest",
        description: "It is an amazing party that everyone will enjoy",
        startTime: new Date('2024-12-31T20:00:00'), // Example start time: December 31, 2024, 8:00:00 PM
        endTime: new Date('2025-01-01T03:00:00'), // Example end time: January 1, 2025, 3:00:00 AM
        address: addresses[2],
        price: 2000,
        isOnline: false,
        capacity: 2,
        attendees: [],
        imageURL: process.env.PUBLIC_URL + '/images/3.jpg'
    },
    {
        _id: 4,
        title: "New Year Party",
        description: "It is an amazing party that everyone will enjoy",
        startTime: new Date('2024-12-31T20:00:00'), // Example start time: December 31, 2024, 8:00:00 PM
        endTime: new Date('2025-01-01T03:00:00'), // Example end time: January 1, 2025, 3:00:00 AM
        address: addresses[0],
        price: 0.0,
        isOnline: true,
        capacity: 5,
        attendees: [],
        imageURL: process.env.PUBLIC_URL + '/images/4.jpg'
    },
    {
        _id: 5,
        title: "New Year Party",
        description: "It is an amazing party that everyone will enjoy",
        startTime: new Date('2024-12-31T20:00:00'), // Example start time: December 31, 2024, 8:00:00 PM
        endTime: new Date('2025-01-01T03:00:00'), // Example end time: January 1, 2025, 3:00:00 AM
        address: addresses[0],
        price: 23.9,
        isOnline: false,
        capacity: 10,
        attendees: [],
        imageURL: process.env.PUBLIC_URL + '/images/5.jpg'
    },
    {
        _id: 6,
        title: "New Year Party",
        description: "It is an amazing party that everyone will enjoy",
        startTime: new Date('2024-12-31T20:00:00'), // Example start time: December 31, 2024, 8:00:00 PM
        endTime: new Date('2025-01-01T03:00:00'), // Example end time: January 1, 2025, 3:00:00 AM
        address: addresses[0],
        price: 2000,
        isOnline: false,
        capacity: 10,
        attendees: [],
        imageURL: process.env.PUBLIC_URL + '/images/1.jpg'
    },
    {
        _id: 7,
        title: "Halloween Zumba evening",
        description: "It is an amazing party that everyone will enjoy",
        startTime: new Date('2024-06-31T10:00:00'), // Example start time: December 31, 2024, 8:00:00 PM
        endTime: new Date('2024-11-01T03:00:00'), // Example end time: January 1, 2025, 3:00:00 AM
        address: addresses[1],
        price: 0.0,
        isOnline: true,
        capacity: 10,
        attendees: [],
        imageURL: process.env.PUBLIC_URL + '/images/2.jpg'
    },
    {
        _id: 8,
        title: "Autumn Fest",
        description: "It is an amazing party that everyone will enjoy",
        startTime: new Date('2024-12-31T20:00:00'), // Example start time: December 31, 2024, 8:00:00 PM
        endTime: new Date('2025-01-01T03:00:00'), // Example end time: January 1, 2025, 3:00:00 AM
        address: addresses[2],
        price: 2000,
        isOnline: false,
        capacity: 2,
        attendees: [],
        imageURL: process.env.PUBLIC_URL + '/images/3.jpg'
    },
    {
        _id: 9,
        title: "New Year Party",
        description: "It is an amazing party that everyone will enjoy",
        startTime: new Date('2024-12-31T20:00:00'), // Example start time: December 31, 2024, 8:00:00 PM
        endTime: new Date('2025-01-01T03:00:00'), // Example end time: January 1, 2025, 3:00:00 AM
        address: addresses[0],
        price: 0.0,
        isOnline: true,
        capacity: 5,
        attendees: [],
        imageURL: process.env.PUBLIC_URL + '/images/4.jpg'
    },
    {
        _id: 10,
        title: "New Year Party",
        description: "It is an amazing party that everyone will enjoy",
        startTime: new Date('2024-12-31T20:00:00'), // Example start time: December 31, 2024, 8:00:00 PM
        endTime: new Date('2025-01-01T03:00:00'), // Example end time: January 1, 2025, 3:00:00 AM
        address: addresses[0],
        price: 23.9,
        isOnline: false,
        capacity: 10,
        attendees: [],
        imageURL: process.env.PUBLIC_URL + '/images/5.jpg'
    }
];*/
