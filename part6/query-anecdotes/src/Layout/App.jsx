import AnecdoteForm from '../components/AnecdoteForm'
import Loader from '../components/Loader'
import Notification from '../components/Notification'
import { NotificationContextProvider } from '../Context/NotificationContext'
import { getAnecdotes, updateAnecdote } from '../Services/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import BadRequest from '../components/BadRequest'
import EmergencyButton from '../components/EmergencyButton'
import '../Styles/App.css'

const App = () => {

  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, votes: anecdote.votes+=1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if(result.isLoading){
    return <Loader/>
  }else if(result.isError){
    return (
      <>
        <BadRequest/>
        <EmergencyButton/>
      </>
    )
  }

  const anecdotes = result.data

  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContextProvider>
  )
}

export default App
