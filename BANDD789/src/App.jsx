import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import Home from './pages/Home.jsx'
import Plans from './pages/Plans.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Reviews from './pages/Reviews.jsx'
import FAQ from './pages/FAQ.jsx'
import Admin from './pages/Admin.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import Book from './pages/Book.jsx'
import NotFound from './pages/NotFound.jsx'
import Blog from './pages/Blog.jsx'
import Calculator from './pages/Calculator.jsx'
import Appointment from './pages/Appointment.jsx'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Toast from './components/Toast.jsx'

export default function App() {
  return (
    <div className="app">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="container"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </motion.main>
      <Footer />
      <Toast />
    </div>
  )
}
