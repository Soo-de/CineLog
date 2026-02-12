import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './Pages/Home';
import AddMovie from './Pages/AddMovie';
import MovieDetail from './Pages/MovieDetail';
import EditMovie from './Pages/EditMovie';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/edit/:id" element={<EditMovie />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
