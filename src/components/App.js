import React, { useEffect, useState } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    fetch('/questions')
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  const toggleShowQuestions = () => {
    setShowQuestions((prev) => !prev);
  };

  return (
    <div>
      <main>
        <section>
          <h2>New Question</h2>
          <QuestionForm />
        </section>

        <section>
          <h1>Quiz Questions</h1>
          <button onClick={toggleShowQuestions}>View Questions</button>
          {showQuestions && <QuestionList questions={questions} />}
        </section>
      </main>
    </div>
  );
}

export default App;
