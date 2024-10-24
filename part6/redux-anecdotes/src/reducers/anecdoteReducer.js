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

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const create = (content) => {
  const newStory = asObject(content)
  return {
    type: 'ADD',
    data: newStory
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}


const reducer = (state = initialState, action) => {

  console.log('Action:',action)
  
  switch(action.type){

    case 'VOTE': {
      const id = action.data.id
      const anecdote = state.find(a => a.id === id )
      const updateAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(story => story.id !== id ? story : updateAnecdote )
    }

    case 'ADD': {
      return [ ...state, action.data ]
    } 

  }

  return state
}

export default reducer