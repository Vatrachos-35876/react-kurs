import { useState } from 'react'
import AnimatedContent from '../styles/Animation/AnimatedContent'

const Part2 = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = total ? (good - bad) / total : 0
  const positive = total ? (good / total) * 100 : 0

  const handleFeedback = (type) => {
    if (type === 'good') setGood(good + 1)
    if (type === 'neutral') setNeutral(neutral + 1)
    if (type === 'bad') setBad(bad + 1)
  }

  const StatisticLine = ({ text, value }) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

  const Statistics = () => {
    if (total === 0) {
      return <p>No feedback given</p>
    } else 
      return (
        <table>
          <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={total} />
              <StatisticLine text="average" value={average.toFixed(2)} />
              <StatisticLine text="positive" value={positive.toFixed(2) + ' %'} />
          </tbody>
        </table>
      )
    }

  return (
    <AnimatedContent
  distance={150}
  direction="vertical"
  reverse={false}
  duration={1.2}
  ease="power3.out"
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
  delay={0.3}
>
    <div>
      <h1>Give feedback</h1>
        <button onClick={() => handleFeedback('good')}>good</button>
        <button onClick={() => handleFeedback('neutral')}>neutral</button>
        <button onClick={() => handleFeedback('bad')}>bad</button>

      <h2>Statistics</h2>
        <Statistics />
    </div>  </AnimatedContent>  
  )
}

export default Part2