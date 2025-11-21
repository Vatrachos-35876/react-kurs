const Course = ({courses}) => {  
  const course = courses.map( courseItem => {
    return (<div key={courseItem.id}>
      <h1>{courseItem.name}</h1>
      <ul>
        {courseItem.parts.map( part => 
          <li key={part.id}>{part.name} {part.exercises} </li>
        )}
        <li>sum of exercises {courseItem.parts.reduce((sum, part) => sum + part.exercises, 0)}</li>
      </ul>
    </div>
    )
  })
  return <div>{course}</div>
}

export default Course;