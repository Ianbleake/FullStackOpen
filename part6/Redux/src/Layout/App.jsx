import '../Styles/index.css'
import '../Styles/App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote }  from '../Services/request'


const App = () => {

  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }
  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return(
    <div className='card' >
      <h2 className='title'>Notes app</h2>
      <div className='notes'>
        <ul className='notescont' >
          {notes.map(note =>
            <li className={`note`} key={note.id} onClick={() => toggleImportance(note)}>
              {note.content} 
              {note.important ? <div className='important' >!</div>  : ''}
            </li>
          )}
        </ul>
      </div>
      <form className='addForm' onSubmit={addNote}>
        <input className='input' name="note" />
        <button className='btn' type="submit">add</button>
      </form>
    </div>
  )
}

export default App
