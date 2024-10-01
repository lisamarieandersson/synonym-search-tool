import './AddSynonymForm.scss';

interface AddSynonymFormProps {
    synonym: string;
    setSynonym: (value: string) => void;
    handleAddSynonymToWord: () => void;
}

function AddSynonymForm({ synonym, setSynonym, handleAddSynonymToWord }: AddSynonymFormProps) {
    return (
        <form
            className="add-synonym-form"
            onSubmit={(e) => {
                e.preventDefault();
                handleAddSynonymToWord();
            }}
        >
            <input
                type="text"
                placeholder="Add synonym"
                value={synonym}
                onChange={(e) => setSynonym(e.target.value)}
                className="add-synonym-form__input"
            />
            <button type="submit" className='add-synonym-form__button'>Add synonym</button>
        </form>
    );
}

export default AddSynonymForm;
