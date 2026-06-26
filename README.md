# 🔗 Shortify – Full Stack URL Shortener

🌐 **Live Demo:** https://shortify-swart.vercel.app/

![React](https://img.shields.io/badge/Frontend-React-blue)
![Express](https://img.shields.io/badge/Backend-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black)

**Shortify** is a full-stack URL shortening platform that allows users to convert long URLs into clean, shareable links. Users can securely manage their shortened URLs through a personalized dashboard, track click analytics, generate QR codes, and instantly share links.

The application uses **Clerk Authentication** for secure user management and stores all URL data in **MongoDB Atlas**. Both the frontend and backend are deployed on **Vercel**.

---

# ✨ Features

## 🔐 Authentication

- Secure authentication using **Clerk**
- User Sign Up & Sign In
- Protected API routes
- JWT-based request verification
- Personalized dashboard for every user

---

## 🔗 URL Shortening

- Convert long URLs into short links
- Unique short code generation
- Duplicate URL detection
- Instant URL creation
- Clean shareable links

---

## 📊 Dashboard

Manage all your shortened links from one place.

Users can:

- View all shortened URLs
- Monitor click counts
- Copy shortened links
- Delete URLs
- View creation dates

---

## 📈 Click Analytics

- Automatically count every visit
- Store analytics in MongoDB
- Display total clicks for each shortened URL

---

## 📱 QR Code Generator

- Generate QR codes for every shortened URL
- Scan and open links instantly
- Easy offline sharing

---

## 📋 Clipboard Support

- One-click copy functionality
- Success notifications using React Hot Toast

---

## 🚀 Fast Redirects

- Redirect users to the original URL
- Clean short URLs
- Automatic click tracking before redirecting

---

## 📱 Responsive Design

- Mobile-friendly UI
- Works across desktop, tablet, and mobile devices

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- React QR Code
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

## Authentication

- Clerk Authentication
- JWT Verification
- Protected REST APIs

---

## Deployment

- Vercel (Frontend)
- Vercel (Backend)

---

# ⚡ Installation

### 1. Clone the repository

```bash
git clone https://github.com/kundan-kumar07/shortify.git
cd shortify
```

---

### 2. Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

### 3. Run the project

#### Start Backend

```bash
npm run dev
```

#### Start Frontend

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create `.env` files inside both **client** and **server** directories.

## Server `.env`

```env
MONGO_URI=your_mongodb_connection_string

CLERK_SECRET_KEY=your_clerk_secret_key

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

## Client `.env`

```env
VITE_BACKEND_URL=https://your-backend-url

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

# 📁 Project Structure

```bash
Shortify
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   ├── assets
│   └── App.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# 🔄 Application Flow

```bash
User
   │
   ▼
React Frontend
   │
Axios API Request
   │
   ▼
Express Backend
   │
Clerk Authentication
   │
MongoDB Atlas
   │
Response
   │
React Dashboard
```

---

# 🚀 Future Improvements

- Custom URL aliases
- Password-protected links
- Link expiration
- Advanced analytics dashboard
- Download QR codes
- Search & filter links
- Custom domains
- Country & device analytics

---

# 👨‍💻 Author

**Kundan Kumar Dubey**

**GitHub:**  
https://github.com/kundan-kumar07

**Live Demo:**  
https://shortify-swart.vercel.app/

**Backend API:**  
https://shortify-api-ebon.vercel.app/
