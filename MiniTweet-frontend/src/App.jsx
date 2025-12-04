import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
 

  return (
    <>
      <div className="App min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <main className="flex-1 p-4 mt-16">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
     
    </>
  )
}

export default App
