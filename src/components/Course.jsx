const Course = ({ course }) => {
  const Header = ({ name }) => <h2>{name}</h2>

  const Content = ({ parts }) => (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )

  const Part = ({ part }) => (
    <div style={{ marginBottom: '20px' }}>
      <h3>{part.name}</h3>
      <p>Exercises: {part.exercises}</p>
    </div>
  )

  const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
        <h3>Total exercises: {total}</h3>
      </div>
    )
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
