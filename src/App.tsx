
import './App.css'
import Footer from './components/elements/Footer'
import NavBar from './components/elements/NavBar'
import Innovation from './components/sections/Innovation'
import Hero from './components/sections/Hero'
import Contact from './components/sections/Contact'

function App() {
  return (
    <main>
      <NavBar />
      <div className='mt-3'>
        <Hero />
        <Innovation />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}

export default App
