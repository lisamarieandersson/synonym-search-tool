// Error messages to the user

export const getNoWordsFoundMessage = (queryWord: string) =>
    `No words found for "${queryWord}". Please try another one.`;

export const getEmptySearchMessage = () => 'Please enter a word to search.';

export const getEmptyFieldsMessage = () =>
    'Both word and synonym are required.';

export const getSelfSynonymMessage = () =>
    'A word cannot be added as its own synonym.';

export const getAddWordErrorMessage = (errorMessage: string) =>
    `Error adding the word and synonym: ${errorMessage}`;

export const getGenericAddWordErrorMessage = () =>
    'Error adding the word and synonym.';
