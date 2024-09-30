import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchForm.scss';

const SearchForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryWord = searchParams.get('q') || ''; // Get 'q' query parameter
    const [word, setWord] = useState(queryWord);
    const [synonym, setSynonym] = useState('');
    const [synonyms, setSynonyms] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [showAddSynonymForm, setShowAddSynonymForm] = useState(false);
    const [showAddNewWordForm, setShowAddNewWordForm] = useState(false);

    useEffect(() => {
        if (queryWord) {
            fetchSynonyms(queryWord); // Fetch synonyms if 'q' is in the query string
        }
    }, [queryWord]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Trim the word
        const trimmedWord = word.trim();

        // Check for an empty input
        if (!trimmedWord) {
            setMessage('Please enter a word to search.');
            return;
        }

        // Clear any previous message before fetching
        setMessage('');

        // Proceed to search
        setSearchParams({ q: trimmedWord });
        fetchSynonyms(trimmedWord);
    };

    const fetchSynonyms = async (searchTerm: string) => {
        const response = await fetch(
            `http://localhost:5000/api/synonym/${searchTerm}`,
        );
        if (response.ok) {
            const data = await response.json();
            if (data.length === 0) {
                setMessage(
                    `No results for ${searchTerm}, please try another word.`,
                );
            } else {
                setSynonyms(data);
                setMessage('');
            }
        } else {
            setSynonyms([]);
            setMessage(
                `No results for ${searchTerm}, please try another word.`,
            );
        }
    };

    // Function to handle adding a new word with a synonym
    const handleAddWordWithSynonym = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!word || !synonym) {
            setMessage('Both word and synonym are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/synonym', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word, synonym }),
            });

            if (response.ok) {
                const result = await response.text(); // Read as text (not JSON)
                setMessage(result); // Display success message from backend
                setSynonym(''); // Clear synonym input field
            } else {
                setMessage('Failed to add the word and synonym.');
            }
        } catch (error) {
            if (error instanceof Error) {
                setMessage(`Error adding the word and synonym: ${error.message}`);
            } else {
                setMessage('Error adding the word and synonym.');
            }
        }
    };

    // Function to handle adding a synonym to an existing word
    const handleAddSynonymToWord = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!word || !synonym) {
            setMessage('Both the word and synonym are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/synonym', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word, synonym }), // Send the word and synonym
            });

            if (response.ok) {
                const result = await response.text();
                setMessage(result); // Display success message
                setSynonym(''); // Clear synonym input field
                fetchSynonyms(word); // Update synonyms list for the word
            } else {
                setMessage('Failed to add the synonym.');
            }
        } catch (error) {
            if (error instanceof Error) {
                setMessage(`Error adding the synonym: ${error.message}`);
            } else {
                setMessage('Error adding the synonym.');
            }
        }
    };


    // Function to clear the input field without affecting the query or results
    const clearInput = () => {
        setWord(''); // Clear the input field
        setMessage(''); // Optionally clear any message
        // Do not affect the query params or synonyms
    };

    return (
        <div className="search-form">
            <form className="search-form__form" onSubmit={handleSubmit}>
                <div className="search-form__container">
                    <input
                        className="search-form__input"
                        id="wordInput"
                        name="word"
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder="Enter a word"
                    />
                    {/* Conditionally render the clear button and divider when input is not empty */}
                    {word && (
                        <>
                            <button
                                className="search-form__button search-form__clear-button"
                                type="button"
                                onClick={clearInput}
                            >
                                <img
                                    src="/icons/clear-search-form-icon.svg"
                                    alt="Clear search"
                                    className="search-form__clear-icon"
                                />
                            </button>
                            <div className="search-form__divider"></div>{' '}
                            {/* Divider will be visible only when word is not empty */}
                        </>
                    )}
                    <button
                        className="search-form__button search-form__search-button"
                        type="submit"
                    >
                        <img
                            src="/icons/search-form-icon.svg"
                            alt="Search"
                            className="search-form__search-icon"
                        />
                    </button>
                </div>
            </form>

            {message && <p className="search-form__feedback">{message}</p>}

            {synonyms.length > 0 ? (
                <div className="search-form__results-group">
                    <h2 className="search-form__heading">
                        Synonyms for "{queryWord}"
                    </h2>
                    <ul className="search-form__results-list">
                        {synonyms.map((synonym, index) => (
                            <li
                                className="search-form__results-list-item"
                                key={index}
                            >
                                {synonym}
                                {index < synonyms.length - 1 && ', '}
                            </li>
                        ))}
                    </ul>
                    <button
                        className="search-form__add-synonym-button"
                        onClick={() => setShowAddSynonymForm(true)}
                    >
                        Add a synonym to this word
                    </button>
                    {showAddSynonymForm && (
                        <form className="search-form__add-synonym-form" onSubmit={handleAddSynonymToWord}>
                            <input
                                type="text"
                                placeholder="Add synonym"
                                value={synonym}
                                onChange={(e) => setSynonym(e.target.value)} // Update synonym state
                            />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>
            ) : (
                <>
                    <button
                        className="search-form__add-new-word-button"
                        onClick={() => setShowAddNewWordForm(true)}
                    >
                        Add new word with a synonym
                    </button>
                    {showAddNewWordForm && (
                        <form className="search-form__add-new-word-form" onSubmit={handleAddWordWithSynonym}>
                            <input
                                type="text"
                                placeholder="Enter a word"
                                value={word} // Use the word state
                                onChange={(e) => setWord(e.target.value)} // Update word state
                            />
                            <input
                                type="text"
                                placeholder="Add synonym"
                                value={synonym}
                                onChange={(e) => setSynonym(e.target.value)} // Update synonym state
                            />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchForm;
