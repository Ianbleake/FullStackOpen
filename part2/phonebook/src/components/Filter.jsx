const Filter = ({handle})=>{
  return(
    <div>
      Search: <input onChange={handle}/>
    </div>
  )
}

export default Filter