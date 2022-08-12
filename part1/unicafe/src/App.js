import { useState } from 'react';

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ text, value }) => (
  <div>
    <span>
      {text} {value}
    </span>
  </div>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = () => good + neutral + bad;

  const average = () => {
    if (good === 0 && neutral === 0 && bad === 0) return 0;
    return (good * 1 + neutral * 0 + bad * -1) / total();
  };

  const positive = () => `${(good / total()) * 100} %`;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Display value={good} text="good" />
      <Display value={neutral} text="neutral" />
      <Display value={bad} text="bad" />
      <Display value={total()} text="all" />
      <Display value={average()} text="average" />
      <Display value={positive()} text="average" />
    </div>
  );
};

export default App;
