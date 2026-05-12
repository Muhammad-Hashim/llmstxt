import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Docs from './pages/Docs'
import DocsGettingStarted from './pages/DocsGettingStarted'
import DocsAPI from './pages/DocsAPI'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <nav className="nav">
            <Link to="/" className="logo">Demo App</Link>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/docs">Docs</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/docs/getting-started" element={<DocsGettingStarted />} />
            <Route path="/docs/api" element={<DocsAPI />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2026 React Demo App · Built with @llmtxt/react</p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
