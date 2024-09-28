// This service handles the in-memory storage and management of synonym relationships.
// It provides methods to add new synonyms and retrieve existing synonyms, including transitive relationships.
// The data is stored using a dictionary, where each word is mapped to a set of its synonyms.
// The service ensures that the synonym relationships are bidirectional and prevents duplicates.

namespace SynonymSearchTool.Services
{
    public class SynonymService
    {
        // Dictionary for storing synonyms
        private Dictionary<string, HashSet<string>> synonymDictionary = new Dictionary<string, HashSet<string>>();

        // Method to add a synonym and their relationship
        public string AddSynonym(string word, string synonym)
        {
            // Ensure the word exists in the dictionary
            if (!synonymDictionary.ContainsKey(word))
            {
                synonymDictionary[word] = new HashSet<string>();
            }
            if (!synonymDictionary.ContainsKey(synonym))
            {
                synonymDictionary[synonym] = new HashSet<string>();
            }

            // Check if the synonym relationship already exists
            if (synonymDictionary[word].Contains(synonym) && synonymDictionary[synonym].Contains(word))
            {
                return "Synonym already exists"; // Return a feedback message to the user
            }

            // Add the synonym relationship in both directions
            synonymDictionary[word].Add(synonym);
            synonymDictionary[synonym].Add(word);

            return "Synonym added";
        }

        // Method to retrieve synonyms for a given word (with transitive lookup)
        public HashSet<string> GetSynonyms(string word)
        {
            if (!synonymDictionary.ContainsKey(word))
            {
                return new HashSet<string>(); // No synonyms found
            }

            // Use a set to track visited words
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
