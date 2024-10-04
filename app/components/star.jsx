import React from "react";
import styled from "styled-components";

const StarRating = ({ rating, onRatingChange }) => {
  const handleChange = (newRating) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <StyledWrapper>
      {[1, 2, 3, 4, 5].map((star) => (
        <label key={star}>
          <input
            type="radio"
            name="rating"
            value={star}
            checked={rating === star}
            onChange={() => handleChange(star)}
            style={{ display: "none" }} 
          />
          <svg
            viewBox="0 0 576 512"
            height="30px"
            className={rating >= star ? "filled" : ""}
            onClick={() => handleChange(star)}
          >
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </label>
      ))}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  gap: 5px;

  svg {
    fill: #666;
    transition: fill 0.2s;

    &.filled {
      fill: #ff9e0b; 
    }
  }

  label {
    cursor: pointer;
    transition: transform 0.2s;
  }

  label:hover {
    transform: scale(1.1);
  }
`;

export default StarRating;
