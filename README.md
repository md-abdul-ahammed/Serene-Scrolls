# boipoka-fe

#### [Live Link](https://goodreaders.vercel.app/)

    	FRONT END: https://goodreaders.vercel.app/
    	GITHUB BE: https://github.com/qridwan/goodreaders-be
    	GITHUB FE: https://github.com/qridwan/goodreaders-fe

#### API URL : https://goodreaders-api.vercel.app/api/v1

- [API Documentation](https://documenter.getpostman.com/view/15074292/2s946fdsdf)

# Book Catalog System - README

This is a book catalog system project built using React and Redux Toolkit for state management. The application allows users to browse a list of books, search for books, add new books, view book details, and leave reviews. The project also includes user authentication to allow only authenticated users to perform certain actions like adding, editing, and deleting books.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Backend Implementation](#backend-implementation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Landing Page:**
  - Header with navigation links: "All Books", "Sign In", and "Sign Up"
  - Top 10 recently added books list
  - Footer

- **Login and Registration Pages:**
  - User authentication with Firebase or custom authentication
  - New user registration with a unique email and password
  - Secure user login using credentials
  - Logout button in the navbar after successful login
  - Secure logout functionality

- **All Books Page:**
  - Fetching and displaying a list of books from an API using RTK Query
  - Displaying key information for each book: Title, Author, Genre, Publication Date
  - Efficient search bar for searching books based on title, author, or genre
  - Filtering options by genre & publication year
  - "Add New" Button to navigate to the "add-new-book" page
  - "Add New Book" navigation menu for authenticated users

- **Add New Book Page:**
  - Authenticated users can add a new book using a form
  - Notification for success or failure of the operation

- **Book Details Page:**
  - Displaying detailed view of a book: Title, Author, Genre, Publication Date, Reviews
  - Buttons for Edit and Delete actions
  - Confirmation dialogue for book deletion
  - Authenticated users can leave reviews for books

- **Edit Books Page:**
  - Authenticated users can edit a book using a form
  - Form pre-filled with current data when editing
  - Notification for success or failure of the operation

- **Bonus Part:**
  - Wishlist feature for users to add books they want to read
  - List of books currently being read or planned to be read
  - Mark books as finished reading

## Getting Started

To get started with the project, follow these steps:

1. Clone the frontend repository: [frontend-repo-link]
2. Clone the backend repository: [backend-repo-link] (Note: Backend implementation is necessary for the application to function properly)
3. Set up the backend and database (Instructions available in the backend repository)
4. Install dependencies for the frontend: `yarn`
5. Start the frontend development server: `yarn dev`

## Project Structure


