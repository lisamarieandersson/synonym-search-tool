import { useEffect, useState } from 'react';
import { addWordWithSynonym, fetchSynonyms } from '../services/synonymService';

export function useSynonymSearch(queryWord: string) {
    const [word, setWord] = useState(queryWord);
    const [searchedWord, setSearchedWord] = useState(queryWord);
    const [message, setMessage] = useState('');
    const [synonyms, setSynonyms] = useState<string[]>([]);
    const [refresh, setRefresh] = useState(0);
    const [newWord, setNewWord] = useState('');
    const [newSynonym, setNewSynonym] = useState('');

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
                    setMessage(
                        `No words found for "${queryWord}". Please try another one.`,
                    );
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

    // Function to handle adding a new word with a synonym
    const handleAddWordWithSynonym = async (
        newWord: string,
        newSynonym: string,
    ) => {
        // Log inputs before processing
        console.log('New Word:', newWord, 'New Synonym:', newSynonym);

        if (!newWord || !newSynonym) {
            setMessage('Both word and synonym are required.');
            return;
        }

        const trimmedWord = newWord.trim().toLowerCase();
        const trimmedSynonym = newSynonym.trim().toLowerCase();

        if (!trimmedWord || !trimmedSynonym) {
            setMessage('Both word and synonym are required.');
            return;
        }

        if (trimmedWord === trimmedSynonym) {
            setMessage('A word cannot be added as its own synonym.');
            return;
        }

        try {
            // Log before API call
            console.log(
                'Adding word and synonym to backend:',
                trimmedWord,
                trimmedSynonym,
            );

            // Call the API to add the word and synonym
            const result = await addWordWithSynonym(
                trimmedWord,
                trimmedSynonym,
            );

            // Log after successful API call
            console.log('API Response:', result);

            setMessage(
                result.message || 'Word and synonym added successfully!',
            );

            // Optionally, fetch updated synonyms
            const updatedSynonyms = await fetchSynonyms(trimmedWord);
            setSynonyms(
                updatedSynonyms.map((synonym: string) => synonym.toLowerCase()),
            );

            // Log updated synonyms
            console.log('Updated Synonyms:', updatedSynonyms);

            // Clear input fields
            setNewWord('');
            setNewSynonym('');

            // Clear the message after 3 seconds
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (error) {
            // Log any errors
            console.error('Error adding the word and synonym:', error);
            if (error instanceof Error) {
                setMessage(
                    `Error adding the word and synonym: ${error.message}`,
                );
            } else {
                setMessage('Error adding the word and synonym.');
            }
        }
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
        newSynonym,
        newWord,
        setWord,
        setNewWord,
        setNewSynonym,
        handleSubmit,
        clearInput,
        handleAddWordWithSynonym,
    };
}
