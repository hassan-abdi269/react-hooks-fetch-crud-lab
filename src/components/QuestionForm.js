import React, { useState } from 'react';

function QuestionForm() {
  const [formData, setFormData] = useState({
    prompt: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
  });

  const [submittedQuestion, setSubmittedQuestion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'correctIndex') {
      setFormData((prevState) => ({
        ...prevState,
        correctIndex: parseInt(value),
      }));
    } else if (name.startsWith('answers-')) {
      const index = parseInt(name.split('-')[1], 10);
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData((prevState) => ({ ...prevState, answers: newAnswers }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    fetch('/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newQuestion) => {
        setSubmittedQuestion(newQuestion); // Optional: show confirmation
        setFormData({ prompt: '', answers: ['', '', '', ''], correctIndex: 0 });
        setIsSubmitting(false); // Stop loading
        setTimeout(() => setSubmittedQuestion(null), 5000); // Clear the submitted question after 5 seconds
      })
      .catch((err) => {
        setError('Failed to submit the question. Please try again.');
        setIsSubmitting(false); // Stop loading on error
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="question-form">
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            data-testid="prompt-input"
            aria-label="Enter the question prompt"
          />
        </label>

        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              name={`answers-${index}`}
              value={answer}
              onChange={handleChange}
              data-testid={`answer-${index}`}
              aria-label={`Enter answer ${index + 1}`}
            />
          </label>
        ))}

        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
            data-testid="correct-answer-select"
            aria-label="Select the correct answer"
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index}>
                Answer {index + 1}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" data-testid="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Question'}
        </button>
      </form>

      {/* Optional: Show the submitted question below */}
      {submittedQuestion && (
        <div data-testid="submitted-question">
          <h2>Question Submitted:</h2>
          <h3>{submittedQuestion.prompt}</h3>
          <ul>
            {submittedQuestion.answers.map((ans, idx) => (
              <li key={idx}>{ans}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Show error message if submission fails */}
      {error && <div style={{ color: 'red' }} data-testid="error-message">{error}</div>}
    </>
  );
}

export default QuestionForm;
