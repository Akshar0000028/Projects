# Deploying this project (frontend) to GitHub Pages

This repository contains a Vite + React frontend and a Node/Express backend in `backend/`.

What I added for you
- `.github/workflows/gh-pages.yml` — GitHub Actions workflow that runs on pushes to `main`, builds the frontend (`npm run build`) and publishes the `./dist` folder to GitHub Pages (the `gh-pages` branch).
- `.gitignore` — common ignores for Node/Vite.

Quick steps to push this repo to GitHub and enable Pages

1. Create a repository on GitHub (via web UI). Note the repo URL, e.g. `https://github.com/USERNAME/REPO.git`.

2. From your project root (PowerShell):

```powershell
# if not already a git repo
git init;
git add .;
git commit -m "Prepare repo and add GitHub Pages workflow";
git branch -M main;
git remote add origin https://github.com/USERNAME/REPO.git;
git push -u origin main;
```

Replace `USERNAME/REPO` with your GitHub username and repository name.

How this deploy works
- The Action builds the frontend and uses `peaceiris/actions-gh-pages` to publish `./dist` to the `gh-pages` branch. GitHub Pages will serve the content from the `gh-pages` branch automatically once the action pushes it.

Notes about backend
- GitHub Pages is static hosting only — it cannot host your Node/Express backend. You can host the backend on services such as Render, Fly, Railway, Heroku (if still supported), or a VPS.
- Typical flow: push the full repo to GitHub, then deploy the backend to Render/Heroku/Vercel (or similar). Set environment variables (DB connection string, JWT secret) in the hosting service settings, and do NOT commit `.env` to the repo.

CORS and frontend/backend URLs
- Update the frontend API base URL (likely in `src/services/api.js`) to point to your backend's public URL after you deploy the backend.

Optional next steps I can do for you
- Add a small workflow to run backend tests or linting.
- Add a README section describing environment variables and local dev instructions.
- Create a GitHub Actions workflow to deploy a backend to a provider that supports GitHub-based deploys (if you pick a provider).
