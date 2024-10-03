/**
 * SynonymResultsList: Displays a list of synonyms for a word.
 * 
 * Props:
 * - synonyms: Array of synonyms.
 * - searchedWord: The word being searched.
 * 
 * Renders a heading with the searched word and a list of synonyms.
 * Adds a comma after each synonym except the last.
 */

import './SynonymResultsList.scss';

interface SynonymResultsListProps {
    synonyms: string[];
    searchedWord: string;
}

function SynonymResultsList({ synonyms, searchedWord }: SynonymResultsListProps) {
    return (
        <div className="synonym-results-list">
            <div className="synonym-results-list__heading-wrapper">
                <h2 className="synonym-results-list__heading-label">Synonyms for </h2>
                <h3 className="synonym-results-list__heading-word">"{searchedWord}"</h3>
            </div>
            <ul className="synonym-results-list__list">
                {synonyms.map((synonym, index) => (
                    <li className="synonym-results-list__list-item" key={index}>
                        {synonym}
                        {index < synonyms.length - 1 && ', '}
                    </li>
                ))}
            </ul>
        </div >
    );
}

export default SynonymResultsList;
