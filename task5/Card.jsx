import React, { useState, useRef } from 'react';

function Card({ question, number, total, onNext }) {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showExpl, setShowExpl] = useState(false);
  const boxRefs = useRef({});

  function pick(label) {
    if (checked) return;
    setSelected(label);
  }

  function showAnswer() {
    question.options.forEach(opt => {
      const el = boxRefs.current[opt.label];
      if (!el) return;
      if (opt.label === question.correct) {
        el.style.background = '#b6e7b6';
        el.style.borderColor = '#2e7d32';
      } else if (opt.label === selected) {
        el.style.background = '#f3b9b9';
        el.style.borderColor = '#c62828';
      }
    });
    setChecked(true);
  }

  function markFor(label) {
    if (checked) {
      if (label === question.correct) return '✓';
      if (label === selected) return '✗';
      return '';
    }
    return label === selected ? '•' : '';
  }

  return (
    <div className="card">
      <div className="code">Завдання {question.code}</div>

      <div className="question">{question.question}</div>

      {question.options.map(opt => (
        <div className="option" key={opt.label}>
          <div className="letter">{opt.label}</div>
          <div>{opt.text}</div>
        </div>
      ))}

      <div className="mark-title">Позначте відповіді:</div>
      <div className="marks">
        {question.options.map(opt => (
          <div className="mark" key={opt.label}>
            <div className="mark-label">{opt.label}</div>
            <div
              className={'mark-box' + (selected === opt.label ? ' picked' : '')}
              ref={el => (boxRefs.current[opt.label] = el)}
              onClick={() => pick(opt.label)}
            >
              {markFor(opt.label)}
            </div>
          </div>
        ))}
      </div>

      <div className="buttons">
        <div className="left-buttons">
          <button className="green" onClick={onNext}>Пропустити</button>
          <button className="green" onClick={showAnswer}>Показати відповідь</button>
          <button className="gray" onClick={() => setShowExpl(!showExpl)}>Читати пояснення</button>
        </div>
        <button className="red" onClick={onNext}>Продовжити пізніше</button>
      </div>

      {showExpl && <div className="explanation">{question.explanation}</div>}

      <div className="progress">Питання {number} з {total}</div>
    </div>
  );
}

export default Card;
