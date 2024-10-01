// Feedback messages to the user

export const getSuccessMessage = (word: string, synonym: string) =>
    `Successfully added "${word}" and its synonym "${synonym}".`;

export const getSynonymExistsMessage = () =>
    `Synonym already exists. Please add another one.`;
