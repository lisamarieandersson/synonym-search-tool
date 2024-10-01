export const fetchSynonyms = async (searchTerm: string) => {
    const response = await fetch(
        `http://localhost:5000/api/synonym/${searchTerm}`,
    );
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('No synonyms found');
    }
};

export const addWordWithSynonym = async (word: string, synonym: string) => {
    const response = await fetch('http://localhost:5000/api/synonym', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, synonym }),
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to add the word and synonym');
    }
};
