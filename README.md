# Department Notice Board

A full-stack notice board for a department. The React frontend lets users view notices retrieved from the backend and submit new notices. The Express API validates each notice and stores it in MongoDB.

## Technologies

- React 18
- TypeScript
- Vite
- Node.js
- Express
- MongoDB and Mongoose
- CORS and dotenv

## Project structure

```text
Department_Notice_Board/
|-- client/
|   |-- src/
|   |   |-- components/NoticeCard.tsx
|   |   |-- App.tsx
|   |   |-- main.tsx
|   |   `-- index.css
|   |-- package.json
|   |-- package-lock.json
|   `-- vite.config.ts
|-- server/
|   |-- models/Notice.ts
|   |-- server.ts
|   |-- package.json
|   |-- package-lock.json
|   |-- tsconfig.json
|   |-- .env.example
|   `-- .gitignore
|-- test-api.http
|-- .gitignore
`-- README.md
```

## Prerequisites

- Node.js and npm
- MongoDB running locally, or a MongoDB deployment you can access
- Visual Studio Code is recommended for the REST Client test file

## Installation

Clone or download the project, then install dependencies separately for the backend and frontend:

```powershell
cd "E:\Academics\Semester - 5\IP\Department_Notice_Board\server"
npm install

cd "..\client"
npm install
```

Create the backend environment file from the safe template:

```powershell
cd "..\server"
Copy-Item .env.example .env
```

Open `server/.env` and set `MONGODB_URI` to your own MongoDB connection string. Keep this file local and never commit it. The default server port is `5000`.

## Running the application

Use two separate terminals.

### Terminal 1: backend

```powershell
cd "E:\Academics\Semester - 5\IP\Department_Notice_Board\server"
npm run dev
```

The backend runs at `http://localhost:5000`.

### Terminal 2: frontend

```powershell
cd "E:\Academics\Semester - 5\IP\Department_Notice_Board\client"
npm run dev
```

Open `http://localhost:5173` in a browser.

Production builds can be created with:

```powershell
cd "E:\Academics\Semester - 5\IP\Department_Notice_Board\server"
npm run build

cd "..\client"
npm run build
```

## API endpoints

| Method | Endpoint | Behavior |
| --- | --- | --- |
| `GET` | `/` | Returns a backend welcome message. |
| `GET` | `/faculty` | Returns the faculty list as JSON. |
| `GET` | `/api/notices` | Returns notices sorted newest first. |
| `POST` | `/api/notices` | Validates and stores a notice. |

The `POST /api/notices` request must contain JSON with non-empty string values:

```json
{
  "title": "Department Meeting",
  "message": "All students are requested to attend the department meeting."
}
```

Validation behavior:

- A valid notice is stored and normally returns `201 Created`.
- A missing, non-string, empty, or whitespace-only `title` returns `400 Bad Request`.
- A missing, non-string, empty, or whitespace-only `message` returns `400 Bad Request`.
- Invalid JSON returns `400 Bad Request`.
- Database or unexpected server failures return `500 Internal Server Error`.

The [test-api.http](./test-api.http) file contains separate REST Client requests for these endpoints and validation cases.

## GitHub safety checklist

- `server/.env` is ignored and must not be uploaded.
- `node_modules/`, `dist/`, logs, TypeScript build-info files, and generated client configuration artifacts are ignored.
- `server/.env.example` contains placeholder values only.
- Review `git status` and `git diff --cached` before the first push to confirm no secrets are staged.
