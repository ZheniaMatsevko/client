
import {User} from "../types/usersTypes";
import {Review} from "../types/reviewTypes";

export const calculateAverageRating = (ratings:Review[]) => {
    if (!ratings || ratings.length === 0) {
        return 0;
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return totalRating / ratings.length;
};
export const hasUserRatedArtwork = (ratings:Review[], currentUser:User) => {
    // Check if there is any rating by the current user
    return ratings.some(rating => rating.author.id === currentUser.id);
};