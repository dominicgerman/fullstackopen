import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdotes(state, action) {
      return state.map((a) => (a.id !== action.payload.id ? a : action.payload))
    },
  },
})

export const { updateAnecdotes, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (id, anecdote) => {
  const newObject = {
    ...anecdote,
    votes: anecdote.votes + 1,
  }
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, newObject)
    dispatch(updateAnecdotes(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
