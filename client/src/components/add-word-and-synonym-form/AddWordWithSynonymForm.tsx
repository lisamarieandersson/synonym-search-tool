import { useState } from 'react';
import './AddWordWithSynonymForm.scss';

const AddWordWithSynonymForm = ({
    handleAddWordWithSynonym,
    message, // Add message as a prop
}: {
    handleAddWordWithSynonym: (word: string, synonym: string) => void,
    message: string // Message prop type
}) => {
    const [newWord, setNewWord] = useState('');
    const [newSynonym, setNewSynonym] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddWordWithSynonym(newWord, newSynonym); // Pass both word and synonym
        setNewWord(''); // Clear input after submit
        setNewSynonym(''); // Clear input after submit
    };


    return (
        <div className="add-word-with-synonym">
            <div className="add-word-with-synonym__container">
                <h2 className="add-word-with-synonym__heading">Add a new word with synonym</h2>
                <form onSubmit={handleSubmit} className="add-word-with-synonym__form">
                    <input
                        type="text"
                        placeholder="Enter a new word"
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        className="add-word-with-synonym__input"
                    />
                    <input
                        type="text"
                        placeholder="Enter a synonym"
                        value={newSynonym}
                        onChange={(e) => setNewSynonym(e.target.value)}
                        className="add-word-with-synonym__input"
                    />
                    <button type="submit" className="add-word-with-synonym__button">Submit</button>
                </form>
                {message && <p className="add-word-with-synonym__feedback">{message}</p>} {/* Feedback for this form */}
            </div>
        </div>
    );
};

export default AddWordWithSynonymForm;
