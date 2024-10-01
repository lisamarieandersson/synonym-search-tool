import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import AddWordWithSynonymForm from './components/add-word-and-synonym-form/AddWordWithSynonymForm';
import Header from './components/header/Header';
import SearchForm from './components/search-form/SearchForm';
import SynonymResultsList from './components/synonym-results-list/SynonymResultsList';
import { useSynonymSearch } from './hooks/useSynonymSearch';
import './styles/index.scss';

const App = () => {
  const {
    synonyms,
    message,
    searchedWord,
    handleAddWordWithSynonym,
  } = useSynonymSearch('');

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

        {/* SynonymResultsList is rendered in the App so it updates live */}
        {synonyms.length > 0 && (
          <SynonymResultsList synonyms={synonyms} searchedWord={searchedWord} />
        )}

        {/* Always render the AddWordAndSynonymForm */}
        <AddWordWithSynonymForm handleAddWordWithSynonym={handleAddWordWithSynonym} message={message} />
        <footer></footer>
      </div>
    </Router>
  );
};

export default App;
