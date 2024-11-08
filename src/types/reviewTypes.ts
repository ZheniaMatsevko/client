import {User} from "./usersTypes";

export interface NewReview{
    author: User;
    rating: number;
    comment: string;
}

export interface Review extends NewReview{
    id: number;
}