import { createSlice } from "@reduxjs/toolkit"

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

export const { vote, create, appendAndecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;