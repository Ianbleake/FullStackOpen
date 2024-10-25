const filterReducer = (state = '',action) =>{
  switch (action.type) {
    case 'SEARCH':{
      console.log("SEARCH",action.payload)
      return action.payload
    }
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: 'SEARCH',
    payload: filter
  }
}

export default filterReducer