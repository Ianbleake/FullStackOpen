import React from 'react'

const NoteForm = ({noteState,stateHandler,handler}) => {
  return (
    <form className='frm' onSubmit={handler}>
      <input className='inpt' value={noteState} onChange={stateHandler}/>
      <button className='btnin' type="submit">save</button>
    </form>
  )
}

export default NoteForm