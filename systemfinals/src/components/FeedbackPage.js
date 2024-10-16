import React, { useState, useEffect, useRef } from 'react';
import './components_css/feedbackform.css';

const FeedbackPage = () => {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [thankYouMessageVisible, setThankYouMessageVisible] = useState(false);
  const feedbackRef = useRef(null);

  const toggleFeedbackForm = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Process the feedback, e.g., send to a server or store it locally
    setIsFeedbackVisible(false); 
    setFeedback(''); 
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
                placeholder="Write your feedback here..."
                className="feedback-textarea"
                required
              />
              <button type="submit" className="submit-feedback-btn">
                Submit
              </button>
            </form>
          </>
        )}
      </div>

      {thankYouMessageVisible && (
        <div className="thank-you-message">
          Thank you for your feedback!
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
