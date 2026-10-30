# MentorConnect – Peer-to-Peer Student Mentorship Platform

MentorConnect is a React web application that helps students discover senior-student mentors, submit mentorship requests, and track request status. A designated mentor can review requests and accept or reject them.

## Technology stack
- React + Vite
- JavaScript, HTML5 and CSS3
- Firebase Authentication (email/password)
- Cloud Firestore and Firestore Security Rules
- Kotlin + Spring Boot REST API
- Spring Security and JWT dependencies
- Gradle
- Postman for API testing

## Project structure
```text
MentorConnect/
├── frontend/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── src/main/kotlin/com/mentorconnect/mentorconnect/
│   └── build.gradle.kts
├── firestore.rules
└── README.md
```

## Run the frontend
1. Install Node.js.
2. Open a terminal in `frontend`.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and fill in your own Firebase web-app configuration.
5. Run `npm run dev`.

Never commit `.env` or private service-account credentials.

## Run the Kotlin backend
Open `backend` in IntelliJ IDEA or VS Code with the Kotlin and Java extensions installed. Use Gradle to run the Spring Boot application. The API is available at `http://localhost:8080/api/mentors`.

Test it in Postman using:
`GET http://localhost:8080/api/mentors`

## Firebase setup
Create a Firebase project, enable Email/Password Authentication, create a Cloud Firestore database, and deploy the rules in `firestore.rules`.

## Important implementation note
This repository is a reconstructed, GitHub-ready implementation based on the project details available in the chat. It is not a byte-for-byte copy of the original laptop project. The Firebase web configuration must be supplied by the repository owner. The Kotlin API included here is a basic working REST API scaffold; verify and extend JWT authentication before treating protected endpoints as production-secure.
