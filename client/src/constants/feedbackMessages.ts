// Feedback messages to the user

export const getSuccessMessage = (word: string, synonym: string) =>
    `Successfully added "${word}" with synonym "${synonym}"!`;

export const getSynonymExistsMessage = () =>
    `Synonym already exists. Please add another one.`;
