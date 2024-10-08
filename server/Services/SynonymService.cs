// This service manages the in-memory storage and retrieval of synonym relationships.
// It provides methods to add new words and their synonyms, and to retrieve synonyms, including transitive relationships.
// The data is stored in a dictionary, where each word is mapped to a set of its synonyms.
// The service ensures that synonym relationships are bidirectional and avoids adding duplicate relationships.
// If a word already exists, new synonyms can be added to it without duplicating the word itself.

namespace SynonymSearchTool.Services
{
    public class SynonymService
    {
        // Dictionary for storing synonyms
        private Dictionary<string, HashSet<string>> synonymDictionary = new Dictionary<string, HashSet<string>>();

        // Method to add a word and its synonym to the dictionary, establishing a bidirectional relationship
        public string AddSynonym(string word, string synonym)
        {

            // Prevent adding the word as its own synonym
            if (word.Equals(synonym, StringComparison.OrdinalIgnoreCase))
            {
                return "Word cannot be added as its own synonym.";
            }


            // Prevent adding the word as its own synonym
            if (word.Equals(synonym, StringComparison.OrdinalIgnoreCase))
            {
                return "Word cannot be added as its own synonym.";
            }

            // Ensure the word exists in the dictionary
            if (!synonymDictionary.ContainsKey(word))
            {
                synonymDictionary[word] = new HashSet<string>();
            }
            if (!synonymDictionary.ContainsKey(synonym))
            {
                synonymDictionary[synonym] = new HashSet<string>();
            }

            // Check if the synonym relationship already exists in both directions
            // This is to prevent duplicate entries in the synonym dictionary
            if (synonymDictionary[word].Contains(synonym) && synonymDictionary[synonym].Contains(word))
            {
                return "Synonym already exists, please add another one"; // Return a feedback message to the user
            }

            // Add the synonym relationship in both directions
            // This ensures that the relationship is reciprocal
            synonymDictionary[word].Add(synonym);
            synonymDictionary[synonym].Add(word);

            return "Synonym successfully added!"; // Return a feedback message to the user
        }

        // Method to retrieve synonyms for a given word
        // This method performs a transitive lookup, meaning it will find synonyms of synonyms, and so on
        public HashSet<string> GetSynonyms(string word)
        {   // If the word is not in the dictionary, return an empty set
            // This indicates that no synonyms were found
            if (!synonymDictionary.ContainsKey(word))
            {
                return new HashSet<string>(); // No synonyms found
            }

             // Use a set to track visited words to avoid cycles
            // Use a queue for breadth-first search
            // Use a set to store the synonyms found
            var visited = new HashSet<string>();
            var queue = new Queue<string>();
            var synonyms = new HashSet<string>();

            // Start with the given word
            queue.Enqueue(word);
            visited.Add(word);

            while (queue.Count > 0)
            {
                var currentWord = queue.Dequeue();
                if (synonymDictionary.ContainsKey(currentWord))
                {
                    foreach (var synonym in synonymDictionary[currentWord])
                    {
                        if (!visited.Contains(synonym))
                        {
                            visited.Add(synonym);
                            synonyms.Add(synonym);
                            queue.Enqueue(synonym);
                        }
                    }
                }
            }

            return synonyms;
        }
    }
}
