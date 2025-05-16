import React from 'react';

const QuestionItem = ({ question, onUpdateCorrectAnswer, onDeleteQuestion }) => {
  const { id, prompt, answers, correctIndex } = question;

  const handleChangeCorrectAnswer = (e) => {
    const updatedCorrectIndex = parseInt(e.target.value, 10);
    onUpdateCorrectAnswer(id, updatedCorrectIndex);
  };

  const handleDelete = () => {
    onDeleteQuestion(id);
  };

  return (
    <div data-testid={`question-${id}`}>
      <h4 data-testid={`question-prompt-${id}`}>{prompt}</h4>
      <label htmlFor={`correct-answer-select-${id}`}>
        Correct Answer:
      </label>
      <select
        id={`correct-answer-select-${id}`}
        value={correctIndex}
        onChange={handleChangeCorrectAnswer}
        data-testid={`correct-select-${id}`}
      >
        {answers.map((answer, index) => (
          <option key={index} value={index}>
            {answer}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleDelete}
        data-testid={`delete-button-${id}`}
      >
        Delete Question
      </button>
    </div>
  );
};

export default QuestionItem;
