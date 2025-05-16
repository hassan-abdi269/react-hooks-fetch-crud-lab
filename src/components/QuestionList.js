import React from 'react';

function QuestionList({ questions }) {
  return (
    <ul>
      {questions.map((question) => (
        <li key={question.id}>
          <h4>{question.prompt}</h4>
          {/* Additional rendering logic for the question */}
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;
