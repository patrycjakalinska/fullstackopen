import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((a) =>
          a.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  )
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const handleVote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id))
    dispatch(changeNotification(`You voted for ${anecdote.content}`, 5))
  }

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default Anecdotes
