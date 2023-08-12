import React, { useState } from "react";

const RatingModal = ({ onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = () => {
        onSubmit(rating);
        onClose();
    };

    return (
        <div className="rating-modal">
            <div className="rating-modal-content">
                <h2>Rate the Film</h2>
                <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= rating ? "filled" : ""}`}
                            onClick={() => handleRatingChange(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <button className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default RatingModal;
