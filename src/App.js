import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import BookSearch from './components/book-search-api/BookSearch';
import Country from "./components/country-api/Country";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className='container'>
            <div className='flex flex-justify flex-center'>
              <img src={logo} className="App-logo" alt="logo" />
              <nav className="site-nav">
                <div>
                  <NavLink className="navlink" to="/">Open Library Search API</NavLink>
                  <NavLink className="navlink" to="/country-api">Country API</NavLink>
                </div>
              </nav>
            </div>
          </div>
        </header>

        <Routes>
          <Route exact path="/" element={<BookSearch />} />
          <Route exact path="/country-api" element={<Country />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
