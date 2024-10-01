import './SynonymResultsList.scss';

interface SynonymResultsListProps {
    synonyms: string[];
    searchedWord: string;
}

function SynonymResultsList({ synonyms, searchedWord }: SynonymResultsListProps) {
    return (
        <div className="synonym-results-list">
            <h2 className="synonym-results-list__heading">Synonyms for "{searchedWord}"</h2>
            <ul className="synonym-results-list__list">
                {synonyms.map((synonym, index) => (
                    <li className="synonym-results-list__list-item" key={index}>
                        {synonym}
                        {index < synonyms.length - 1 && ', '}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SynonymResultsList;
