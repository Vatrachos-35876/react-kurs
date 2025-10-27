import { useState } from 'react';
import Part1 from './components/part1-1'
import Part2 from './components/part1-2'
import Part3 from './components/part1-3'
import Aurora from './styles/Aurora/Aurora';


const ButtonSwitch = ({ onClick, text }) => (
  <button onClick={onClick} className="button-switch">
    {text}
  </button>
)

const App = () => {
  const [activePart, setActivePart] = useState(1);

  const handleSwitch = (part) => {
    setActivePart(part);
  }

  return (
    <div>
      <Aurora
        colorStops={["#3A29FF", "#814fba", "#4819cb"]}
        blend={3.0}
        amplitude={0.5}
        speed={0.3}
      />

      <ButtonSwitch onClick={() => handleSwitch(1)} text="Part1-1" />
      <ButtonSwitch onClick={() => handleSwitch(2)} text="Part1-2" />
      <ButtonSwitch onClick={() => handleSwitch(3)} text="Part1-3" />

      {activePart === 1 && <Part1 />}
      {activePart === 2 && <Part2 />}
      {activePart === 3 && <Part3 />}
    </div>
  )
}

export default App
