import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import {User} from "../../types/usersTypes";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {NewReview, Review} from "../../types/reviewTypes";
import ReviewService from "../../API/ReviewService";

interface ReviewFormProps {
    currentUser: User;
    currentEventId: number;
    onRatingAdded: (review: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ currentUser, currentEventId, onRatingAdded }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ rating: 0, comment: '' });



    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const ratingData: NewReview = {
            rating: data.rating,
            comment: data.comment,
            author: currentUser,
        };

        ReviewService.addReview(currentEventId, ratingData)
            .then((addedReview) => { // Here addedReview is the newly added review data
                toast.success("The rating was added successfully");
                setFormData({ rating: 0, comment: '' });
                onRatingAdded(addedReview); // Pass the addedReview to onRatingAdded
            })
            .catch(() => {
                toast.error("Failed to add review")
            });
    }

    const renderStars = (rating: number) => {
        const totalStars = 10;

        return (
            <>
                {[...Array(rating)].map((_, index) => (
                    <FontAwesomeIcon icon={solidStar} key={index} className="text-warning cursor-pointer" onClick={() => handleStarClick(index + 1)} />
                ))}
                {[...Array(totalStars - rating)].map((_, index) => (
                    <FontAwesomeIcon icon={regularStar} key={rating + index} className="text-secondary cursor-pointer" onClick={() => handleStarClick(rating + index + 1)} />
                ))}
            </>
        );
    };

    const handleStarClick = (clickedRating: number) => {
        const newRating = clickedRating === formData.rating ? 0 : clickedRating;
        setFormData({ ...formData, rating: newRating });
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, comment: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.comment.length > 5000) {
            toast.error("Comment length cannot exceed 5000 characters");
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="d-flex justify-content-center">
            <form style={{ width: '99%' }} onSubmit={handleSubmit} className="mt-2 text-center">
                <h4 className="text-lg font-semibold mb-2" style={{ textAlign: 'left' }}>Add Your Review</h4>
                <div className="mb-2" style={{ textAlign: 'left' }}>{renderStars(formData.rating)}</div>
                <textarea
                    value={formData.comment}
                    onChange={handleCommentChange}
                    placeholder="Add your comments..."
                    rows={6}
                    className="w-100 p-2 border border-secondary rounded"
                />
                <div style={{ width: '15%'}} className="d-flex justify-content-start mt-2">
                    <button type="submit" className="btn btn-primary">Add review</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
