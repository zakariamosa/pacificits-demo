Pacific ITS – Frontend Authentication Demo

Author: Zakaria Mosa
Project Type: Frontend-focused demonstration project

A modern authentication frontend showcasing real-world login flows using Email/Password and Google OAuth 2.0.
Built with React and deployed via GitHub Pages.

This repository intentionally focuses on frontend architecture, routing, OAuth integration, and CI/CD deployment.
A backend API exists only to validate the frontend behavior and is not part of this repository.

🚀 Live Demo

Frontend (GitHub Pages):
👉 https://zakariamosa.github.io/pacificits-demo/

Supporting API (Azure – demo only):
👉 https://pacificits-d8h5fbf4cshxa3c6.swedencentral-01.azurewebsites.net/api

The backend is external, supports the demo, and is not intended to be recreated by reviewers.

🎯 Project Scope

This project demonstrates:

Frontend authentication flows

Secure OAuth integration

Client-side routing under sub-path hosting (/pacificits-demo)

Environment-aware frontend builds

Production-style CI/CD for static applications

The backend exists only to ensure the frontend behaves as expected in a realistic environment.

🛠 Tech Stack
Frontend

React 19

Vite

React Router v7

Axios

Google OAuth (@react-oauth/google)

Custom CSS (BankID-inspired UI)

Deployment

GitHub Pages (static hosting)

GitHub Actions (build & deploy pipeline)

Supporting Backend (not included)

.NET Web API

JWT authentication

Azure App Service

SQL Server

🔐 Frontend Environment Configuration

The frontend uses build-time environment variables injected via GitHub Actions.

Required (preconfigured for this demo)
VITE_API_URL=https://pacificits-d8h5fbf4cshxa3c6.swedencentral-01.azurewebsites.net/api


This value points to the live demo backend used to validate authentication flows.
Reviewers and users do not need to modify this value.

Optional (for forks or OAuth experimentation)
VITE_GOOGLE_CLIENT_ID=your_google_client_id


This identifies the Google OAuth application.
Users who fork this repository may replace it with their own Client ID if they wish to experiment with Google login.

If not provided, the application UI will still load, but Google authentication will be unavailable.

Important Notes

Variables prefixed with VITE_ are public by design and compiled into the frontend bundle.

No secrets or private keys are stored in this repository.

The backend API is external and intentionally excluded.

🔁 Authentication Features

Email / Password login

Google OAuth 2.0 login

JWT-based session handling

Protected routes (Dashboard)

🏗 Architecture Overview

Client (This Repository)

React (Vite)

UI rendering, routing, and authentication flow handling

API (External / Demo Only)

Token issuance and validation

OAuth verification

User persistence

This mirrors a real production setup while keeping the repository frontend-focused.

⚙️ Running Locally (UI Exploration Only)

The project can be run locally to explore the UI and code structure:

npm install
npm run dev


Authentication actions require a compatible backend API and are not expected to function in isolation.

🧪 CI/CD Pipeline

Triggered on every push to main

GitHub Actions:

Installs dependencies

Injects environment variables

Builds the Vite application

Deploys to GitHub Pages

📌 What This Demo Demonstrates

Practical React application structure

OAuth integration in a real deployment

Correct handling of environment variables

Routing for sub-path static hosting

Secure frontend configuration practices

📄 License

This project is intended for demonstration and learning purposes.