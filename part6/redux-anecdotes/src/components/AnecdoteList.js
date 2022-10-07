import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  return (
    <ul>
      {[...anecdotes]
        .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            handleClick={() => {
              dispatch(vote(anecdote.id, anecdote))
              dispatch(
                setNotification(`You voted for '${anecdote.content}'`, 5)
              )
            }}
            key={anecdote.id}
            anecdote={anecdote}
          />
        ))}
    </ul>
  )
}

export default AnecdoteList
