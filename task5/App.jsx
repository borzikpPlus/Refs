import React, { useState } from 'react';
import Card from './Card';
import questions from './questions';

function App() {
  const [index, setIndex] = useState(0);

  function next() {
    setIndex((index + 1) % questions.length);
  }

  const q = questions[index];

  return (
    <div className="page">
      <Card
        key={q.code}
        question={q}
        number={index + 1}
        total={questions.length}
        onNext={next}
      />
    </div>
  );
}

export default App;
