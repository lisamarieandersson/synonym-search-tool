# Synonym Search Tool

The Synonym Search Tool is a web application that allows users to add and search for synonyms, with functionality that includes bidirectional lookup of synonyms. The tool is built using a React frontend and a C# backend.

## Features

- Add new words with synonyms: Users can input a word and its synonym, and the tool will store them together.
- Search for synonyms: Users can look up a word, and the tool will return its synonyms.
- Bidirectional synonym lookup: The lookup works in both directions. For example, if "wash" is added as a synonym for "clean," the user will be able to search for both "wash" and "clean" to get the respective synonym results.

## Technologies used

- Frontend: React, Vite, TypeScript, Sass
- Backend: C# with .NET
- Testing: Vitest is configured for the frontend (a limited amount of test are currently available)

## Requirements

To run this project locally, you will need:

- .NET: Download and install the .NET SDK on your machine to run the backend.
- Node.js: Required for the frontend (React) setup.

## How to run the project

- This project is organized as a monorepo with both frontend (client) and backend (server) code in separate directories.

### Frontend (Client)

1. Navigate to the client folder:

```
cd client
```

2. Install dependencies

```
npm install
```

3. Start the development server:

```
npm run dev
```

### Backend (Server)

1. Navigate to the server folder:

```
cd server
```

2. Install the necessary dependencies for the .NET backend:

```
dotnet restore
```

3. Run the backend server:

```
dotnet run
```

## API Testing

You can use REST Client (a VS Code extension) to test the API endpoints. Alternatively, tools like Postman can also be used to send HTTP requests.

## Continuous Integration

This project uses GitHub Actions for automated workflows. The following tasks are currently automated:

- Frontend tests: Runs the Vitest tests whenever changes are pushed to the repository.
- Linting and formatting: Ensures code adheres to the project's linting rules and uses Prettier for consistent formatting.
- Build checks: Automatically builds the project to ensure there are no build errors.
- Deployment: Deploys the frontend to Netlify.

You can find the configuration for these workflows in the .github/workflows/ directory.

## Demo

You can try the frontend demo here: [Synonym Search Tool](https://synonymsearchtool.netlify.app/)

## Notes

- This project is set up with Vitest for frontend testing, although the test coverage is currently limited.
- The repository is structured as a monorepo, so be sure to navigate to the correct directories (client and server) before running commands.
