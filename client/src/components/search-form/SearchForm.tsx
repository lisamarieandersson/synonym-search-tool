import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSynonymSearch } from '../../hooks/useSynonymSearch';
import './SearchForm.scss';

const SearchForm = () => {
    const [searchParams] = useSearchParams();
    const queryWord = searchParams.get('q') || '';
    const navigate = useNavigate();

    const {
        word,
        setWord,
        handleSubmit,
        clearInput,
    } = useSynonymSearch(queryWord); // Using the custom hook

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(navigate); // Call the function from the custom hook
    };

    return (
        <div className="search-form">
            <form className="search-form__form" onSubmit={handleFormSubmit}>
                <div className="search-form__container">
                    <input
                        className="search-form__input"
                        id="wordInput"
                        name="word"
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder="Search for a word"
                    />
                    {word && (
                        <>
                            <button
                                className="search-form__button search-form__clear-button"
                                type="button"
                                onClick={clearInput} // Call clearInput on click
                            >
                                <img
                                    src="/icons/clear-search-form-icon.svg"
                                    alt="Clear search"
                                    className="search-form__clear-icon"
                                />
                            </button>
                            <div className="search-form__divider"></div>
                        </>
                    )}
                    <button className="search-form__button search-form__search-button" type="submit">
                        <img
                            src="/icons/search-form-icon.svg"
                            alt="Search"
                            className="search-form__search-icon"
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
