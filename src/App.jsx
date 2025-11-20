const Course = ({course}) => {
  const result = course.parts.map(i => 
    <li key={i.id}>{i.name}</li>
  )
  console.log(result);

  return (<div>
    <h1>{course.name}</h1>
    <ul>
      {result}
    </ul>
  </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App