import { Navbar, Footer, } from './components'
import { MyGrants, Grants, Welcome, } from './pages'
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom'
import { } from 'react-router-dom'

const App = () => {
  return (
    <HashRouter basename="/">
      <div className="min-h-screen">
        <div className="gradient-bg-welcome text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/grants" element={<Grants />} />
            <Route path="/my-grants" element={<MyGrants />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </HashRouter>
  )
}
export default App