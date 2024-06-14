const Header = (props)=>{
  console.log(props)
  return(<h1>{props.course.name}</h1>)
}


const Part = (props) => {
  return(
    <p>{props.title}: Num.exercises: {props.exercises}</p>
  )
}

const Content = (props)=>{
  console.log(props)
  return(
    <>
    <Part title={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
    <Part title={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
    <Part title={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
    </>
  )
}

const Total = (props)=>{
  let total = 0
  let exercises = props.course.parts
  exercises.forEach(element => {
    total = total+element.exercises
  });
  return(<p>Total of exercises: {total}</p>)
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course}/>

      <Content course={course} />

      <Total course={course}/>
    </div>
  )
}

export default App