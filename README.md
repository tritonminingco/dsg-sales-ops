DSG-sales-Ops

This repo contains a small React app (Vite) for booking demos and demonstrating the DeepSeaGuard landing flow.

Goals completed in this repo:
- Removed external Manus branding and favicons.
- Converted UI to simple React + plain CSS so the app is self-contained and deployable.
- Added a minimal serverless endpoint placeholder suggestion for Vercel to accept demo requests.

## Quick start (Windows PowerShell)

1. Install dependencies

   ```powershell
   npm install
   ```

2. Run dev server

   ```powershell
   npm run dev
   # open http://localhost:5173
   ```

3. Build for production

   ```powershell
   npm run build
   ```

4. Preview production build locally

   ```powershell
   npm run preview
   # open http://localhost:5173
   ```

## Deploying to Vercel (recommended)

1. Push the repo to GitHub:

   ```powershell
   git init
   git add .
   git commit -m "Cleaned branding, prepare for Vercel deploy"
   # create repo on GitHub and add remote
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

2. Go to https://vercel.com/import and import the GitHub repository. Vercel will detect the project as a Vite app.
   - Build command: `npm run build`
   - Output directory: `dist`

3. (Optional) Add environment variables in Vercel settings if you plan to enable real lead persistence.

## Serverless demo API (suggested)

- Path: `/api/submit-lead`
- Method: POST
- Expected JSON body: { name, email, company, role, phone, message, responses }
- Response: { success: true, message?: string }












