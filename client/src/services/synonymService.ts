// API Call Service

const url =
    import.meta.env.MODE === 'production'
        ? 'https://synonym-search-tool.onrender.com'
        : 'http://localhost:8080';

// Function to fetch synonyms for a given search term
export const fetchSynonyms = async (searchTerm: string) => {
    // Send a GET request to the synonym API with the search term
    const response = await fetch(`${url}/api/synonym/${searchTerm}`);
    // If the response is OK (status 200-299), return the response data as JSON
    if (response.ok) {
        return await response.json();
    } else {
        // If the response is not OK, throw an error
        throw new Error('No synonyms found');
    }
};

// Function to add a word and its synonym
export const addWordWithSynonym = async (word: string, synonym: string) => {
    // Send a POST request to the synonym API with the word and synonym as JSON in the request body
    const response = await fetch(`${url}/api/synonym`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, synonym }),
    });

    // If the response is OK (status 200-299), return the response data as JSON
    if (response.ok) {
        return await response.json();
    } else {
        // If the response is not OK, throw an error
        throw new Error('Failed to add the word and synonym');
    }
};
