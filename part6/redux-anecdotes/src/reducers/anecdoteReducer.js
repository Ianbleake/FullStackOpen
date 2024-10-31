import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../Services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create: (state,action) => {
      const content = action.payload;
      const newAnecdote = {
        content,
        id: getId(),
        votes: 0
      };
      state.push(newAnecdote)  
    },
    vote: (state, action) => {
      const id = action.payload;
      const anecdote = state.find(a => a.id === id);
      if(anecdote){
        anecdote.votes += 1;
      }
    },
    appendAndecdote: (state,action)=>{
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }

})

export const { vote, appendAndecdote, setAnecdotes } = anecdoteSlice.actions;

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch((setAnecdotes(anecdotes)))
  }
}

export const create = content => {
  return async dispatch =>{
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAndecdote(newAnecdote))
  }
}



export default anecdoteSlice.reducer;