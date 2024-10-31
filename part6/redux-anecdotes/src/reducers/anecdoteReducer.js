import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../Services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
    }
  }
});

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions;

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const create = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = id => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find(a => a.id === id);
    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    };

    const savedAnecdote = await anecdoteService.updateVote(updatedAnecdote);
    dispatch(updateAnecdote(savedAnecdote));
  };
};

export default anecdoteSlice.reducer;
