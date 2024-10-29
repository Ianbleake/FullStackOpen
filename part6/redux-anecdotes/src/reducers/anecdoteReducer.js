import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  { id:1, content: 'If it hurts, do it more often', votes: 0 },
  { id:2, content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
  { id:3, content: 'Adding manpower to a late software project makes it later!', votes: 0 },
  { id:4, content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
  { id:5, content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
  { id:6, content: 'Premature optimization is the root of all evil.', votes: 0 },
  { id:7, content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 }
]

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
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
    }
  }

})

export const { vote, create } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;