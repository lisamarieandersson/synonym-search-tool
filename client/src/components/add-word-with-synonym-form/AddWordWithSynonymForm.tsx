/**
 * AddWordWithSynonymForm: A form to add a new word and its synonym.
 * 
 * Props:
 * - handleAddWordWithSynonym: Called on form submit with new word and synonym.
 * - message: Displayed to the user.
 * 
 * State:
 * - newWord and newSynonym: Bound to form inputs.
 * 
 * On submit, calls handleAddWordWithSynonym and clears inputs.
 */

import { useState } from 'react';
import './AddWordWithSynonymForm.scss';

interface AddWordWithSynonymFormProps {
    handleAddWordWithSynonym: (word: string, synonym: string) => void;
    message: string;
}


function AddWordWithSynonymForm({ handleAddWordWithSynonym, message }: AddWordWithSynonymFormProps) {
    const [newWord, setNewWord] = useState('');
    const [newSynonym, setNewSynonym] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            handleAddWordWithSynonym(newWord, newSynonym);
            setNewWord(''); // Clear input after submit
            setNewSynonym(''); // Clear input after submit
        } catch (error) {
            console.error(error); // Log the error for now
        }
    }


    return (
        <div className="add-word-with-synonym-form">
            <div className="add-word-with-synonym-form__container">
                <h3 className="add-word-with-synonym-form__heading">Add a new word with synonym</h3>
                <form onSubmit={handleSubmit} className="add-word-with-synonym-form__form">
                    <input
                        type="text"
                        placeholder="Enter a new word"
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        className="add-word-with-synonym-form__input"
                    />
                    <input
                        type="text"
                        placeholder="Enter a synonym"
                        value={newSynonym}
                        onChange={(e) => setNewSynonym(e.target.value)}
                        className="add-word-with-synonym-form__input"
                    />
                    <button type="submit" className="add-word-with-synonym-form__button">Submit</button>
                </form>
                {message && <p className="add-word-with-synonym-form__feedback">{message}</p>} {/* Feedback for this form */}
            </div>
        </div>
    );
};

export default AddWordWithSynonymForm;
