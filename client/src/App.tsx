import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header';
import SearchForm from './components/search-form/SearchForm';
import './styles/index.scss';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <header>
          <Header />
        </header>

        <Routes>
          {/* Redirect from "/" to "/search" */}
          <Route path="/" element={<Navigate to="/search" />} />

          {/* Search page with query parameter */}
          <Route path="/search" element={<SearchForm />} />
        </Routes>

        <footer>
        </footer>
      </div>
    </Router>
  );
};

export default App;

