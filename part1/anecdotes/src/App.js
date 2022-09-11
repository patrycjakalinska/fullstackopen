import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ text, votes }) => (
  <>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </>
);

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const App = () => {
  const anecdotes = [
    "The best way to get a project done faster is to start sooner",
    "The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging.",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Even the best planning is not so omniscient as to get it right the first time.",
    "Good code is its own best documentation. As you're about to add a comment, ask yourself, 'How can I improve the code so that this comment isn't needed?' Improve the code and then document it to make it even clearer.",
    "It's OK to figure out murder mysteries, but you shouldn't need to figure out code. You should be able to read it.",
    "An organization that treats its programmers as morons will soon have programmers that are willing and able to act like morons only.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const mostVotedAnecdoteIndex = points.indexOf(Math.max(...points));

  const getRandomAnecdote = (curr, min, max) => {
    let newRandomIndex = getRandomInt(min, max);
    return newRandomIndex === curr
      ? getRandomAnecdote(curr, min, max)
      : newRandomIndex;
  };

  const handleVoteClick = () => {
    const pointsCopy = [...points];
    pointsCopy[selected]++;
    setPoints(pointsCopy);
  };

  return (
    <div>
      <h2>Anectode of the day</h2>
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button
        onClick={() =>
          setSelected(getRandomAnecdote(selected, 0, anecdotes.length))
        }
        text="next anecdote"
      />
      <Button onClick={handleVoteClick} text="vote" />
      <h2>Anecdote with most votes</h2>
      <Anecdote
        text={anecdotes[mostVotedAnecdoteIndex]}
        votes={points[mostVotedAnecdoteIndex]}
      />
    </div>
  );
};

export default App;
