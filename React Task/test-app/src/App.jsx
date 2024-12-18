import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/Compnent/Navbar.jsx';
import Cocktail from './assets/Compnent/Cocktail.jsx';
import Bank from './assets/Compnent/Bank.jsx';
import Potter from './assets/Compnent/Potter.jsx';
import Mainpage from './assets/Compnent/Mainpage.jsx';
import Home from './assets/Compnent/Home.jsx';
import Mealinfo from './assets/Compnent/Mealinfo.jsx';
// import './App.css';
import './index.css'; 
function App() {
  return (
    // <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Mainpage" element={<Mainpage />} />
          <Route path="/Cocktail" element={<Cocktail />} />         
          <Route path="/:mealid" element={<Mealinfo />} />
          <Route path="/Bank" element={<Bank />} />
          <Route path="/Potter" element={<Potter />} />
        </Routes>
      </div>
    // </Router>
    
  );
}

export default App;
