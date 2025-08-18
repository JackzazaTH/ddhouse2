import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './routes/Home'
import Plans from './routes/Plans'
import Portfolio from './routes/Portfolio'
import Reviews from './routes/Reviews'
import FAQ from './routes/FAQ'
import Admin from './routes/Admin'
import NotFound from './routes/NotFound'

export default function App(){
  return (
    <div className="min-h-full flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/plans" element={<Plans/>} />
          <Route path="/portfolio" element={<Portfolio/>} />
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
