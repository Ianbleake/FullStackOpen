import { useAlertDispatch } from "../Context/NotificationContext"
import { createAnecdote } from "../Services/request"
import { useMutation, useQueryClient } from "@tanstack/react-query"


const AnecdoteForm = () => {

  const alertDispatch = useAlertDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      alertDispatch({type: 'SET', payload: 'New Anecdote added'})
      setTimeout(()=>{
        alertDispatch({type:'CLEAR'})
      },5000)
    },
    onError: (error)=>{
      if(error.response.status === 400){
        alertDispatch({type: 'SET', payload: `${error.response.data.error}`})
        setTimeout(()=>{
          alertDispatch({type:'CLEAR'})
        },5000)
      }else{
        alertDispatch({type: 'SET', payload: 'someting bad happen'})
        setTimeout(()=>{
          alertDispatch({type:'CLEAR'})
        },5000)
      }

    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
