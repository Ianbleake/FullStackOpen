const Header = (props)=>{
  console.log(props)
  return(<h1>{props.course}</h1>)
}


const Part = (props) => {
  return(
    <p>{props.title}: Num.exercises: {props.exercises}</p>
  )
}

const Content = (props)=>{
  return(
    <>
    <Part title={props.part1} exercises={props.exercises1} />
    <Part title={props.part2} exercises={props.exercises2} />
    <Part title={props.part3} exercises={props.exercises3} />
    </>
  )
}

const Total = (props)=>{
  return(<p>Total of exercises: {props.exercisesCount}</p>)
}

const App = () => {

  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>

      <Content part1={parts[0].name} part2={parts[1].name} part3={parts[2].name} exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={parts[2].exercises}/>

      <Total exercisesCount={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

export default App