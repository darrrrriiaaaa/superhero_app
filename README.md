# Superhero Database App

## Descriprion
This is a React-based superhero application. It allows users to view, add, update, and delete superheroes. Data stored in MongoDB.

## Requirements
- Node.js
- npm / yarn

## Installation & Running
1. Clone the repository.
```
git clone https://github.com/darrrrriiaaaa/superhero_app.git
cd superhero_app
```
2. Install dependencies in root, backend, and frontend.
```
npm install
cd backend
npm install
cd ../frontend
npm install
```
3. Start the server (from the root).
```
npm run dev
```
4. Open the app in your browser on ```http://localhost:3000```.

## Features
- Data stored in MongoDB
- Working CRUD operations
- Carousel with superheroes and their images
- Display of data and buttons
- Responsive styles with flexbox

## Assumptions
- No authorization or authentication is currently implemented
- Images are stored in MongoDB as URLs
- Connection with MongoDB available via the '.env' file.

## Future Improvements
- Improve styling and responsiveness
- Add search and filters
- Implement authorization and user roles for admins, users etc.
