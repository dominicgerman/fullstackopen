import { useState } from 'react';

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0)
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine value={props.good} text="good" />
          <StatisticLine value={props.neutral} text="neutral" />
          <StatisticLine value={props.bad} text="bad" />
          <StatisticLine value={props.all} text="all" />
          <StatisticLine value={props.average} text="average" />
          <StatisticLine value={props.positive} text="positive" />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = () => good + neutral + bad;

  const average = () => {
    if (good === 0 && neutral === 0 && bad === 0) return 0;
    return (good * 1 + neutral * 0 + bad * -1) / all();
  };

  const positive = () => `${(good / all()) * 100} %`;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all()}
        average={average()}
        positive={positive()}
      />
    </div>
  );
};

export default App;
