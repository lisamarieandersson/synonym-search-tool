import { useEffect, useState } from 'react';
import { fetchSynonyms } from '../services/synonymService';

export function useSynonymSearch(queryWord: string) {
    const [word, setWord] = useState(queryWord);
    const [searchedWord, setSearchedWord] = useState(queryWord);
    const [message, setMessage] = useState('');
    const [synonyms, setSynonyms] = useState<string[]>([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        if (queryWord) {
            fetchSynonyms(queryWord)
                .then((data) => {
                    setSynonyms(data);
                    setMessage('');
                    setSearchedWord(queryWord); // Update searchedWord when the search is performed
                    console.log(
                        `Search for "${queryWord}" was successful. Synonyms:`,
                        data,
                    );
                })
                .catch(() => {
                    setMessage(`Error fetching results for "${queryWord}"`);
                    setSynonyms([]); // Clear on error
                });
        }
    }, [queryWord, refresh]);

    const handleSubmit = (navigate: (path: string) => void) => {
        const trimmedWord = word.trim();
        if (!trimmedWord) {
            setMessage('Please enter a word to search.');
            return;
        }
        navigate(`/search?q=${trimmedWord}`); // Update URL with the query
        setWord(trimmedWord); // Set the searched word state
        setRefresh(refresh + 1);
    };

    const clearInput = () => {
        setWord('');
        setMessage('');
    };

    return {
        word,
        searchedWord,
        message,
        synonyms,
        setWord,
        handleSubmit,
        clearInput,
    };
}
