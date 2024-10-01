// This hook is used for:
// API fetching (fetchSynonyms).
// Handling form submission (handleSubmit).
// Handling adding a synonym to a word (handleAddSynonymToWord).
// State management (like word, synonym, message).

import { useEffect, useState } from 'react';
import { addWordWithSynonym, fetchSynonyms } from '../services/synonymService';

export const useSynonymSearch = (queryWord: string) => {
    const [word, setWord] = useState(queryWord || '');
    const [synonyms, setSynonyms] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [synonym, setSynonym] = useState('');
    const [searchedWord, setSearchedWord] = useState(queryWord || '');
    const [newWord, setNewWord] = useState('');
    const [newSynonym, setNewSynonym] = useState('');

    // Fetch synonyms and handle results
    useEffect(() => {
        if (queryWord) {
            fetchSynonyms(queryWord)
                .then((data) => {
                    if (data.length === 0) {
                        setMessage(
                            `No results for ${queryWord}, please try another word.`,
                        );
                        setSynonyms([]); // Clear the synonyms list if no results are found
                    } else {
                        // Normalize the fetched synonyms to lowercase for consistency
                        setSynonyms(
                            data.map((synonym: string) =>
                                synonym.toLowerCase(),
                            ),
                        );
                        setMessage('');
                        setSearchedWord(queryWord); // Set the searched word
                    }
                })
                .catch(() => {
                    setMessage(
                        `No results for ${queryWord}, please try another word.`,
                    );
                    setSynonyms([]); // Clear the synonyms list on error
                });
        }
    }, [queryWord]);

    // Handle word search submission
    const handleSubmit = (navigate: (path: string) => void) => {
        const trimmedWord = word.trim();
        if (!trimmedWord) {
            setMessage('Please enter a word to search.');
            return;
        }
        // Trigger navigation with the search query
        navigate(`/search?q=${trimmedWord}`);

        setWord(trimmedWord); // Ensure word is set to the searched word
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

    // Function to handle adding a synonym to an existing word
    const handleAddSynonymToWord = async () => {
        // Ensure both word and synonym are provided
        if (!word || !synonym) {
            setMessage('Both the word and synonym are required.');
            return;
        }

        const trimmedWord = word.trim().toLowerCase(); // Normalize the word
        const trimmedSynonym = synonym.trim().toLowerCase(); // Normalize the synonym

        // Prevent adding the word as its own synonym
        if (trimmedWord === trimmedSynonym) {
            setMessage('A word cannot be added as its own synonym.');
            setSynonym(''); // Clear the synonym input field
            return;
        }

        // Check if the synonym already exists in the list
        if (synonyms.map((s) => s.toLowerCase()).includes(trimmedSynonym)) {
            setMessage('Synonym is already added.');
            setSynonym(''); // Clear the synonym input field
            return;
        }

        try {
            // Add the synonym and update the state
            const result = await addWordWithSynonym(
                trimmedWord,
                trimmedSynonym,
            );
            setMessage(result.message); // Display success message

            // Fetch updated synonyms after successfully adding a synonym
            const updatedSynonyms = await fetchSynonyms(trimmedWord);
            setSynonyms(
                updatedSynonyms.map((synonym: string) => synonym.toLowerCase()),
            ); // Normalize updated synonyms list

            // Clear the synonym input field
            setSynonym('');
            // Clear any error messages after successful addition
            setMessage('');
        } catch (error) {
            if (error instanceof Error) {
                setMessage(`Error adding the synonym: ${error.message}`);
            } else {
                setMessage('Failed to add the synonym.');
            }
            setSynonym(''); // Ensure the synonym input field is cleared even on error
        }
    };

    // Function to clear the input field without affecting the query or results
    const clearInput = () => {
        setWord(''); // Clear the input field
        setMessage(''); // Optionally clear any message
    };

    return {
        word,
        setWord,
        synonyms,
        message,
        setMessage,
        synonym,
        newWord,
        newSynonym,
        setSynonym,
        searchedWord,
        handleSubmit,
        handleAddSynonymToWord,
        handleAddWordWithSynonym,
        clearInput,
    };
};
