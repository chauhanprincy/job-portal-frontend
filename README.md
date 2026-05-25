# 💼 Job Portal — Frontend

A modern, role-based Job Portal web application built with **React + Vite**. Job Seekers can browse and apply for jobs, while Employers can post listings and manage applicants — all through a clean, responsive UI.

---

## 🖥️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool & Dev Server |
| React Router DOM | Client-side Routing |
| Axios | HTTP API Requests |
| Bootstrap | Base Styling |
| JWT Decode | Token Parsing |
| Custom CSS | Design System (index.css) |

---

## ✨ Features

### 👤 Job Seeker
- Register and login securely (JWT-based auth)
- Browse all available job listings
- Apply for jobs with one click
- View all submitted applications

### 🏢 Employer
- Register as an Employer
- Post new job listings (title, company, description, location, salary)
- View all jobs you've posted
- See applicants for each job listing

---

## 📁 Project Structure

```
src/
├── api/
│   └── api.js               # Axios instance with auth interceptor
├── components/
│   └── Navbar.jsx            # Role-aware navigation bar
├── pages/
│   ├── Home.jsx              # Job listings dashboard
│   ├── Login.jsx             # Login page
│   ├── Register.jsx          # Registration page
│   ├── MyApplications.jsx    # Job Seeker: view applications
│   ├── CreateJob.jsx         # Employer: post a new job
│   └── EmployerJobs.jsx      # Employer: view posted jobs & applicants
├── services/
│   ├── authService.js        # Login & Register API calls
│   ├── jobService.js         # Job listing API calls
│   └── applicationService.js # Application API calls
├── utils/
│   └── auth.js               # JWT decode helper (getUser)
├── App.jsx                   # Routes & layout
├── main.jsx                  # React entry point
└── index.css                 # Global design system & CSS variables
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAM/job-portal-frontend.git

# 2. Navigate into the project folder
cd job-portal-frontend

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will run at `http://localhost:5173`

> **Note:** This frontend connects to the Job Portal API backend. Make sure the backend is running at `http://localhost:5027` before using the app.
> You can change the API base URL in `src/api/api.js`.

---

## 🔗 Related Repository

- 🔧 **Backend API:** [job-portal-api](https://github.com/YOUR_USERNAME/job-portal-api) — ASP.NET Core Web API

---

## 🔐 Authentication

This app uses **JWT (JSON Web Tokens)** for authentication. The token is stored in `localStorage` and automatically attached to every API request via an Axios interceptor.

Two user roles are supported:
- `JobSeeker` — can browse and apply for jobs
- `Employer` — can post jobs and view applicants

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
