# 📚 BookNook — Online Library & Book Borrowing Platform

BookNook is a full-stack online library and book borrowing web application built with Next.js (App Router), TypeScript, Express.js, MongoDB, and Better Auth. It helps readers explore books, share new titles, borrow and return copies, and manage their reading lists through a clean and responsive interface.

**Live Site:** https://book-nook-client-a8.vercel.app

## ✨ Features

- Browse the latest books and explore the full library catalog.
- View detailed book information including author, genre, description, available copies, and contributor info.
- Add new books with available copy counts and share them with the community.
- Edit existing book details and delete user-owned books with confirmation.
- Borrow available books with automatic 7-day borrow and return dates.
- Prevent duplicate active borrows of the same book and automatically update available copies.
- Return borrowed books from **My Borrows** and restore available copy counts.
- Sign up and sign in using email and password with password validation.
- Sign in with Google via Better Auth.
- Protect private routes (`Add Book`, `My Books`, `My Borrows`, `Book Details`, `Profile`) and redirect unauthenticated users to login.
- View profile details, update display name, and sign out.
- Receive instant feedback through toast notifications.
- Responsive design for mobile, tablet, and desktop screens.
- Custom 404 Not Found page.

## 🛠️ Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Swiper.js
- Better Auth
- Express.js
- MongoDB
- JWT (`jose`)
- Lucide React
- React Icons
- React Hot Toast

## 🔐 Authentication

The application uses Better Auth and MongoDB for authentication and user management, along with JWT verification on protected Express endpoints:

- Email and password authentication with password validation.
- Google sign-in option.
- User session and JWT token handling.
- Protected routes and API endpoints.
- Profile name updates.
- Sign-out functionality.

## 📁 Project Structure

```text
book-nook-client/
├── src/
│   ├── app/
│   │   ├── add-book/
│   │   ├── books/
│   │   │   └── [id]/
│   │   ├── login/
│   │   ├── my-books/
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   ├── my-borrows/
│   │   ├── profile/
│   │   ├── register/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── home/
│   │   ├── shared/
│   │   └── ui/
│   └── lib/
├── public/
├── proxy.ts
└── README.md

🎯 Project Goal
The goal of BookNook is to make discovering, sharing, and borrowing books simple and organized. Users can browse books, borrow titles with clear return tracking, and manage their own books and borrows seamlessly across devices.

👩‍💻 Developer
Israt Jannat Halima

Aspiring Full Stack Web Developer.