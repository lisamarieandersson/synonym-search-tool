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

2. Install the dependencies:

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

## Docker and Deployment to Render

This project is containerized using Docker and deployed to Render.
To run this project with Docker, make sure the following software is installed on your machine:

[Docker](https://www.docker.com/) (required for building and running the Docker container)

### Docker

The project is containerized using Docker. Below are the steps to build and run the application:

1. Build the Docker Image:

```
docker build -t synonymsearchtool .
```

2. Run the Container for Local Development (port 5000):

```
docker run -d -p 5000:5000 synonymsearchtool
```

After running the container, the application will be available at [localhost:5000](http://localhost:5000)

### Deployment to Render

- The project is automatically deployed to Render using Docker.
- Render builds the Docker image and deploys it to the provided URL, exposing port 8080 for the API.
- You can access the deployed API through the Render-provided URL, for example:
- https://synonym-search-tool.onrender.com/api/synonym/clean

## Continuous Integration

This project uses GitHub Actions for automated workflows on the frontend. The following tasks are currently automated:

- Frontend tests: Runs the Vitest tests whenever changes are pushed to the repository.
- Linting and formatting: Ensures code adheres to the project's linting rules and uses Prettier for consistent formatting.
- Build checks: Automatically builds the project to ensure there are no build errors.
- Deployment: Deploys the frontend to Netlify.

You can find the configuration for these workflows in the .github/workflows/ directory.

## Demo

You can try out the frontend demo here: [Synonym Search Tool](https://synonymsearchtool.netlify.app/)

## Notes

- This project is set up with Vitest for frontend testing. While test coverage is currently limited, more tests will be added in the future.
- The repository is structured as a monorepo, so be sure to navigate to the correct directories (client and server) before running commands.
