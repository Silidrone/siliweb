import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Experience from './pages/Experience';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Navigation />

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/blog" element={<Blog/>} />
                    <Route path="/projects" element={<Projects/>} />
                    <Route path="/experience" element={<Experience/>} />
                </Routes>
            </main>

            <Footer />
        </div>
    </BrowserRouter>
    
  );
}

export default App;
