import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {
  return (
    <ul>
      {[...props.anecdotes]
        .filter((a) =>
          a.content.toLowerCase().includes(props.filter.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            handleClick={() => {
              props.vote(anecdote.id, anecdote)
              props.setNotification(`You voted for '${anecdote.content}'`, 5)
            }}
            key={anecdote.id}
            anecdote={anecdote}
          />
        ))}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  vote,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList
