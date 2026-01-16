import { useState } from 'react'
import CourseApp from './sections/CourseApp'
import PhonebookApp from './sections/PhonebookApp'
import CountriesApp from './sections/CountriesApp'
import DarkVeil from './components/DarkVeil'
import './styles/style.css'

const App = () => {
  const [activeSection, setActiveSection] = useState('countries')

  const sections = [
    { id: 'course', label: 'Course Information' },
    { id: 'phonebook', label: 'Phonebook' },
    { id: 'countries', label: 'Countries' },
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'course':
        return <CourseApp />
      case 'phonebook':
        return <PhonebookApp />
      case 'countries':
        return <CountriesApp />
      default:
        return <CountriesApp />
    }
  }

  return (
    <>
      <DarkVeil speed={1} scanlineFrequency={0.5} />
      <div className="app-container">
      {/* Left Sidebar Menu */}
      <div className="app-sidebar">
        <h2 className="app-sidebar-title">Menu</h2>

        <div className="app-sections">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`menu-button ${activeSection === section.id ? 'active' : ''}`}
            >
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="app-content">
        {renderSection()}
      </div>
    </div>
    </>
  )
}

export default App
