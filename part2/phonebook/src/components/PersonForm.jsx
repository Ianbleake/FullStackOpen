import { Title } from "./Title"

const PersonForm = ({nameAction,phoneAction,addAction,nameState,phoneState})=>{
  return(
    <div>
      <Title text={'Add a new'} />
      <form>
        <div>
          name: <input onChange={nameAction} value={nameState}/>
        </div>
        <div>
          Phone: <input onChange={phoneAction} value={phoneState} maxLength='10'/>
        </div>
        <div>
          <button onClick={addAction} type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm