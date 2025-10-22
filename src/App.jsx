import { useState } from 'react'

const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({ onClick , text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const add = () => setCounter(counter + 1)
  const rem = () => setCounter(counter - 1)
  const zero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={add} text="Add" />
      <Button onClick={zero} text="Zero" />
      <Button onClick={rem} text="Remove" />
    </div>
  )
}

export default App