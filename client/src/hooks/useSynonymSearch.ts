/**
 * This file defines the useSynonymSearch custom hook.
 *
 * useSynonymSearch is a hook that manages the state and logic for searching synonyms of a word.
 * It provides the following state variables and functions:
 *
 * - word: The current word being searched.
 * - searchedWord: The word that was last searched.
 * - message: The current message to display to the user.
 * - synonyms: The synonyms of the searched word.
 * - newSynonym: The new synonym being added.
 * - newWord: The new word being added.
 * - setWord: Function to set the word state.
 * - setNewWord: Function to set the new word state.
 * - setNewSynonym: Function to set the new synonym state.
 * - handleSubmit: Function to handle the form submission.
 * - clearInput: Function to clear the input fields.
 * - handleAddWordWithSynonym: Function to handle adding a new word with its synonym.
 *
 * It also includes a useEffect hook that fetches the synonyms for the queryWord whenever queryWord or refresh state changes.
 */

import { useEffect, useState } from 'react';
import {
    getAddWordErrorMessage,
    getEmptyFieldsMessage,
    getNoWordsFoundMessage,
    getSelfSynonymMessage,
} from '../constants/errorMessages';
import {
    getSuccessMessage,
    getSynonymExistsMessage,
} from '../constants/feedbackMessages';
import { addWordWithSynonym, fetchSynonyms } from '../services/synonymService';

export function useSynonymSearch(queryWord: string) {
    const [word, setWord] = useState(queryWord);
    const [searchedWord, setSearchedWord] = useState(queryWord);
    const [message, setMessage] = useState('');
    const [synonyms, setSynonyms] = useState<string[]>([]);
    const [refresh, setRefresh] = useState(0);
    const [newWord, setNewWord] = useState('');
    const [newSynonym, setNewSynonym] = useState('');

    // This useEffect is triggered when the queryWord or refresh state changes.
    // It fetches the synonyms for the queryWord and updates the state accordingly.
    useEffect(() => {
        // Only perform the fetch if a queryWord is provided
        if (queryWord) {
            fetchSynonyms(queryWord)
                .then((data) => {
                    // Update the synonyms and clear the message on successful fetch
                    setSynonyms(data);
                    setMessage('');
                    // Update the searchedWord state to reflect the word that was actually searched
                    setSearchedWord(queryWord);
                })
                .catch(() => {
                    // If the fetch fails, set an error message and clear the synonyms
                    setMessage(getNoWordsFoundMessage(queryWord));
                    setSynonyms([]); // Clear on error
                });
        }
    }, [queryWord, refresh]); // The effect depends on queryWord and refresh

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
        // Check if both newWord and newSynonym are provided
        if (!newWord || !newSynonym) {
            setMessage(getEmptyFieldsMessage());
            return;
        }

        const trimmedWord = newWord.trim().toLowerCase();
        const trimmedSynonym = newSynonym.trim().toLowerCase();

        // Check if both trimmedWord and trimmedSynonym are non-empty
        if (!trimmedWord || !trimmedSynonym) {
            setMessage(getEmptyFieldsMessage());
            return;
        }

        // Check if the trimmedWord is the same as the trimmedSynonym
        if (trimmedWord === trimmedSynonym) {
            setMessage(getSelfSynonymMessage());
            return;
        }

        try {
            // Call the API to add the word and synonym
            const result = await addWordWithSynonym(
                trimmedWord,
                trimmedSynonym,
            );

            // Check if the response indicates that the synonym already exists
            if (
                result.message ===
                'Synonym already exists, please add another one'
            ) {
                setMessage(getSynonymExistsMessage());
                return; // Return early, skipping the synonym update
            }

            // Set success message if successfully added
            setMessage(getSuccessMessage(newWord, newSynonym));

            // Fetch updated synonyms only if the word was successfully added
            const updatedSynonyms = await fetchSynonyms(trimmedWord);
            setSynonyms(
                updatedSynonyms.map((synonym: string) => synonym.toLowerCase()),
            );

            // Clear input fields
            setNewWord('');
            setNewSynonym('');

            // Clear the message after 4 seconds
            setTimeout(() => {
                setMessage('');
            }, 4000);
        } catch (errorResponse) {
            if (errorResponse instanceof Response) {
                const error = await errorResponse.json();
                setMessage(getAddWordErrorMessage(error.message));
            }
        }
    };

    // Function to clear the input field without affecting the query or results
    const clearInput = () => {
        setWord(''); // Clear the input field
        setMessage(''); // Optionally clear any message
    };

    // Return the state and functions from the hook
    return {
        word, // The current word being searched
        searchedWord, // The word that was last searched
        message, // The current message to display to the user
        synonyms, // The synonyms of the searched word
        newSynonym, // The new synonym being added
        newWord, // The new word being added
        setWord, // Function to set the word state
        setNewWord, // Function to set the new word state
        setNewSynonym, // Function to set the new synonym state
        handleSubmit, // Function to handle the form submission
        clearInput, // Function to clear the input fields
        handleAddWordWithSynonym, // Function to handle adding a new word with its synonym
    };
}
