import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header';
import SearchForm from './components/search-form/SearchForm';
import './styles/index.scss';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <Header />
        </header>


        <Routes>
          {/* Render the SearchForm on both the main page and /search */}
          <Route
            path="/"
            element={<SearchForm />}
          />
          <Route
            path="/search"
            element={<SearchForm />}
          />
        </Routes>

        {/* Always render the AddWordAndSynonymForm */}
        {/*         <AddWordWithSynonymForm handleAddWordWithSynonym={handleAddWordWithSynonym} message={message} /> */}
        <footer></footer>
      </div>
    </Router>
  );
};

export default App;
