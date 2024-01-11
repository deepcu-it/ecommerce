// FeedbackCard.js
import React from 'react';
import './ProductFeedback.css';

const ProductFeedback = () => {
  return (
    <div className="feedback-card">
      <h1 className="text-center text-xl font-bold">Send Feedback</h1>
      <textarea
        className="feedback-textarea"
        placeholder="Your feedback..."
      ></textarea>
      <button className="feedback-button">
        <svg viewBox="0 0 512 512" height="20px" xmlns="http://www.w3.org/2000/svg">
        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
        </svg>
      </button>
      <button className="feedback-button">
        <svg viewBox="0 0 512 512" height="20px" xmlns="http://www.w3.org/2000/svg">
        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
        </svg>
      </button>
      <span className="col-span-2"></span>
      <button className="feedback-action-button">
        Submit
      </button>
    </div>
  );
};

export default ProductFeedback;
