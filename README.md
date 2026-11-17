# CampusCare — Smart Campus Complaint Tracker

A responsive **frontend-only** complaint management portal built with HTML, CSS and vanilla JavaScript. Students can submit campus issues, browse their complaint history, and filter reports by category or status.

## Features
- Student dashboard with complaint statistics
- Submit a complaint with title, category, location, description, priority and email
- Complaint status tracking: Pending, In Progress and Resolved
- Search complaints by title, category or location
- Filter by status and category
- Responsive design for desktop, tablet and mobile
- Browser `localStorage` persistence
- Sample complaints included to demonstrate the dashboard

## Run locally
1. Download and extract this project.
2. Open `index.html` in any modern browser.
3. Click **New complaint** to submit a sample issue.

No installation or build tools are required.

## Upload to GitHub
1. Create a new public repository named `smart-campus-complaint-tracker`.
2. Upload `index.html`, `style.css`, `script.js` and `README.md` to the repository root.
3. Commit the files.

## Publish with GitHub Pages
1. Open your repository and go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`.
4. Click **Save** and wait for the deployment link to appear.

## Project structure
```text
smart-campus-complaint-tracker/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Important note
This is a frontend demonstration, not a production complaint system. Data is stored only in the current browser using `localStorage`. There is no authentication, admin dashboard, email notification, backend, or shared database. New complaints start with the **Pending** status; status changes would require a backend/admin workflow in a full-stack version.
