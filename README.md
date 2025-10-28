# TalentFlow - A Mini Hiring Platform

[Live Demo Link](https://talent-flow-xi.vercel.app/) TalentFlow is a front-end application built with React that simulates a mini hiring platform for HR teams to manage jobs, candidates, and assessments. This project was built to fulfill the requirements of a technical assignment.

## Core Features

-   **Jobs Management:** Create, edit, archive, and reorder jobs with drag-and-drop.
-   **Candidate Tracking:** View candidates in a virtualized list, move them through hiring stages on a Kanban board, and view their profiles.
-   **Assessment Builder:** Dynamically create job-specific quizzes with various question types, validation, and conditional logic.

## Technical Stack

-   **Framework:** React
-   **Styling:** Tailwind CSS
-   **State Management:** React Context / Zustand (Choose one)
-   **Data Fetching:** Axios
-   **Drag & Drop:** React Beautiful DnD
-   **Virtualization:** React Window
-   **API Mocking:** Mock Service Worker (MSW)
-   **Local Persistence:** Dexie.js (for IndexedDB)
-   **Notifications:** React Hot Toast

## Project Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Anshika03singh/TalentFlow.git](https://github.com/Anshika03singh/TalentFlow.git)
    cd TalentFlow
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

## Architecture & Technical Decisions

*(This section is very important!)*

In this section, I will explain the key technical decisions made during development:

-   **API Mocking (MSW):** I chose MSW because it intercepts network requests at the service worker level, allowing the application to use a real-world `fetch`/`axios` syntax without knowing it's talking to a mock server. This makes it easy to switch to a real backend later.
-   **Local Persistence (Dexie.js):** To ensure data persists on refresh, I used Dexie.js, a minimalist wrapper for IndexedDB. MSW handlers write through to IndexedDB, which acts as our local database.
-   **State Management:** For managing complex, shared state like the list of jobs and candidates, I opted for [Zustand/React Context] because... *(explain why)*.
-   **Component Structure:** The project is structured by feature (e.g., `/jobs`, `/candidates`) to keep related logic, components, and hooks organized.

## Known Issues & Future Improvements

-   *List any bugs you couldn't fix or features you'd add if you had more time.*
