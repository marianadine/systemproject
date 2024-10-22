import React, { useState, useEffect, useRef } from 'react';
import './components_css/feedbackform.css';

const FeedbackPage = () => {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [thankYouMessageVisible, setThankYouMessageVisible] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState('');
  const feedbackRef = useRef(null);

  const minCharacterCount = 5;
  const maxCharacterCount = 100;

  const toggleFeedbackForm = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };

  // Get custom thank you message based on the rating
  const getThankYouMessage = () => {
    switch (rating) {
      case 1:
        return "Thank you for your feedback. We'll work on improving!";
      case 2:
        return "Thanks! We're always looking for ways to get better.";
      case 3:
        return "Thank you! We appreciate your balanced feedback.";
      case 4:
        return "Thanks a lot! We're glad you had a good experience.";
      case 5:
        return "Awesome! Thank you for your great feedback!";
      default:
        return "Thank you for your feedback!";
    }
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    const trimmedFeedbackLength = feedback.replace(/\s+/g, '').length;

    if (trimmedFeedbackLength < minCharacterCount || trimmedFeedbackLength > maxCharacterCount) {
      alert(`Feedback must be between ${minCharacterCount} and ${maxCharacterCount} characters (excluding spaces).`);
      return;
    }

    console.log(`Feedback: ${feedback}, Rating: ${rating}`);

    setIsFeedbackVisible(false);
    setFeedback('');
    setRating(0);

    // Set custom thank you message
    setThankYouMessage(getThankYouMessage());

    setThankYouMessageVisible(true);

    setTimeout(() => {
      setThankYouMessageVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (feedbackRef.current && !feedbackRef.current.contains(event.target)) {
        setIsFeedbackVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [feedbackRef]);

  const handleStarClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleStarHover = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleStarHoverLeave = () => {
    setHoverRating(0);
  };

  const currentCharacterCount = feedback.replace(/\s+/g, '').length;

  return (
    <div>
      <button className="feedback-icon-btn" onClick={toggleFeedbackForm}>
        <i className="fas fa-comment"></i> 
      </button>

      <div ref={feedbackRef} className={`feedback-floating-window ${isFeedbackVisible ? 'feedback-visible' : ''}`}>
        {isFeedbackVisible && (
          <>
            <button className="close-feedback-btn" onClick={toggleFeedbackForm}>
              &times;
            </button>
            <h3>Submit Your Feedback</h3>
            <form onSubmit={handleSubmitFeedback}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback here... (5-100 characters)"
                className="feedback-textarea"
                required
              />
              <div className={`character-counter ${currentCharacterCount > maxCharacterCount ? 'exceeds-limit' : ''}`}>
                {currentCharacterCount}/{maxCharacterCount}
              </div>
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <i
                      key={index}
                      className={`fas fa-star ${ratingValue <= (hoverRating || rating) ? 'star-filled' : ''}`}
                      onClick={() => handleStarClick(ratingValue)}
                      onMouseEnter={() => handleStarHover(ratingValue)}
                      onMouseLeave={handleStarHoverLeave}
                    ></i>
                  );
                })}
              </div>
              <button 
                type="submit" 
                className="submit-feedback-btn" 
                disabled={currentCharacterCount < minCharacterCount || currentCharacterCount > maxCharacterCount}
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>

      {thankYouMessageVisible && (
        <div className="thank-you-message">
          {thankYouMessage}
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
