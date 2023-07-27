import logo from './logo.svg';
import './App.css';
import BookSearch from './book-search-api/BookSearch';

const NavLink = ({link,text}) => <a href={link} className='navlink'>{text}</a>;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <div className='flex flex-justify flex-center'>
            <img src={logo} className="App-logo" alt="logo" />
            <nav className="site-nav">
              <div>
                <NavLink link="/" text="Open Library Search API" />
                <NavLink link="/" text="IMDB Search API" />
              </div>
            </nav>
          </div>
        </div>
      </header>

      <BookSearch />
    </div>
  );
}

export default App;
