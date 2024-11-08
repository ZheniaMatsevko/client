import axios from "axios";
import { NewEvent } from "../types/eventTypes";
export default class EventService {
    static async getAllEvents() {
        try {
            const response = await axios.get('http://localhost:8090/events');
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера:', error);
            throw error;
        }
    }

    static async getEventById(id:number) {
        try {
            const response = await axios.get(`http://localhost:8090/events/${id}`);
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера:', error);
            throw error;
        }
    }

    static async getEventsWhereTakesPart(userId: number) {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.get(`http://localhost:8090/events/participant/${userId}`,config);
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера:', error);
            throw error;
        }
    }
    static async createEvent(event: NewEvent, file?: File) {
        try {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
            }
            formData.append('event', JSON.stringify(event));
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.post('http://localhost:8090/events/new', formData, config);
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }
    static async editEvent(event: NewEvent, id: number, file?: File) {
        try {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
            }
            formData.append('event', JSON.stringify(event));
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.put(`http://localhost:8090/events/${id}`, formData, config);
            return response.data;
        } catch (error) {
            console.error('Error editing event:', error);
            throw error;
        }
    }
    static async getEventsByOrganiserId(id:number) {
        try {
            const response = await axios.get(`http://localhost:8090/events/organiser/${id}`);
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера:', error);
            throw error;
        }
    }

    static async registerUserForEvent(userId:number,eventId:number) {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            const response = await axios.put(`http://localhost:8090/events/${eventId}/register/${userId}`,null,config);
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера:', error);
            throw error;
        }
    }

    static async unregisterUserFromEvent(userId: number, eventId: number) {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            const response = await axios.put(`http://localhost:8090/events/${eventId}/unregister/${userId}`,null,config);
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера:', error);
            throw error;
        }
    }
    static async deleteEventById(id: number) {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            return await axios.delete(`http://localhost:8090/events/${id}`, config);
        } catch (error) {
            console.error('Помилка при видаленні події:', error);
            throw error;
        }
    }
}