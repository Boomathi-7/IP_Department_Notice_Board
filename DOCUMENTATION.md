# Department Notice Board - Assignment 2 Documentation

## 1. Title

Department Notice Board

## 2. Introduction

The Department Notice Board is a web application for publishing and viewing department announcements. A React frontend communicates with an Express backend, which stores notices in MongoDB using Mongoose.

## 3. Objectives

- Build a REST API using Node.js and Express.
- Connect the application to MongoDB with Mongoose.
- Create a React and TypeScript notice board interface.
- Validate notice title and message values.
- Integrate the frontend and backend using HTTP requests.

## 4. Technologies Used

Node.js, Express.js, MongoDB, Mongoose, React, TypeScript, Vite, dotenv, and CORS.

## 5. System Architecture

The user interacts with the React client on port 5173. The client requests `/api/notices` through the Vite development proxy. Express on port 5000 validates requests and uses the Mongoose Notice model to read and write MongoDB documents. The response is returned to React and rendered as NoticeCard components.

## 6. Project Structure

The `client` folder contains the Vite React application, reusable `NoticeCard` component, page logic, and CSS. The `server` folder contains the Express application, Mongoose model, environment template, and TypeScript configuration.

## 7. Part A - Server

`server/server.ts` configures Express, JSON parsing, CORS, the welcome route, faculty route, notice routes, error handling, and the MongoDB connection. `server/models/Notice.ts` defines required, trimmed `title` and `message` fields.

## 8. Part B - React Page

`client/src/App.tsx` contains the notice form and notice list. `client/src/components/NoticeCard.tsx` is a reusable component that receives `title` and `message` props. `client/src/index.css` provides a responsive, professional layout without a UI library.

## 9. Part C - Frontend/Backend Integration

When the page opens, `useEffect` calls `GET /api/notices`. Form submission validates both fields and sends a JSON `POST /api/notices` request. The saved response is added to the list immediately. Loading, submit, empty, and error states are displayed.

## 10. API Endpoints

| Method | Endpoint | Result |
| --- | --- | --- |
| GET | `/` | Welcome JSON message |
| GET | `/faculty` | Faculty name array |
| GET | `/api/notices` | Notice document array |
| POST | `/api/notices` | HTTP 201 and saved notice |

## 11. Database Design

The `Notice` collection contains `title` and `message` string fields. Both are required and trimmed. Mongoose also records `createdAt` and `updatedAt` timestamps for each saved notice.

## 12. Validation

The server rejects missing, non-string, or whitespace-only titles and messages with HTTP 400. The React form performs the same empty-value check before making a request.

## 13. Testing

Test the welcome and faculty URLs in a browser. Use Postman or PowerShell to send valid and invalid notice requests. Open the React page to verify initial loading, adding a notice, validation messages, and error states. Verify saved documents in MongoDB.

## 14. How to Run the Project

Create `server/.env` from `.env.example` and set a valid `MONGODB_URI` and `PORT`. Run `npm install` and `npm run dev` in `server`. In a second terminal, run `npm install` and `npm run dev` in `client`. Use the client URL shown by Vite.

## 15. Results

The completed application provides the required four endpoints, stores valid notices in MongoDB, and displays retrieved and newly created notices in a React interface.

## 16. Conclusion

This project demonstrates full-stack Internet Programming concepts: REST API creation, database persistence, server-side validation, React component design, and frontend/backend integration using TypeScript.

