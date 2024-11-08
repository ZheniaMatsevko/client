import axios from "axios";
import { NewReview } from "../types/reviewTypes";
export default class ReviewService {
    static async addReview(id: number, review: NewReview) {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.post(`http://localhost:8090/reviews/${id}`, review, config);
            return response.data;
        } catch (error) {
            console.error('Помилка при додаванні відгуку:', error);
            throw error;
        }
    }
    static async deleteReviewById(eventId: number, reviewId: number) {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            return await axios.delete(`http://localhost:8090/reviews/${reviewId}/${eventId}`, config);
        } catch (error) {
            console.error('Помилка при видаленні відгуку:', error);
            throw error;
        }
    }
}