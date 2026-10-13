# 🚀 Culture Radar — 2-Minute Vercel Deployment Guide

> **Mandatory Devpost Requirement:**  
> *"Demos must be hosted and fully published externally (e.g. a live website, web app). Projects that only run locally or require private access do not qualify."*

Follow these steps to deploy **Culture Radar** live to Vercel for free in under 2 minutes:

---

### Step 1: Push Code to a Public GitHub Repository

1. Open your terminal in the project directory:
   ```bash
   cd "C:\Users\Taha\Downloads\Cultural Radar"
   ```
2. Create a new public repository on [GitHub](https://github.com/new) called `cultural-radar`.
3. Add the remote and push:
   ```bash
   git remote add origin https://github.com/<your-username>/cultural-radar.git
   git branch -M master
   git push -u origin master
   ```

---

### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **"Add New..."** -> **"Project"**.
3. Select your `cultural-radar` repository and click **Import**.
4. In the **Environment Variables** section, add the following 4 variables:
   | Key | Value | Description |
   |---|---|---|
   | `QLOO_API_KEY` | `<your-qloo-api-key>` | Your Qloo Hackathon key |
   | `QLOO_BASE_URL` | `https://hackathon.api.qloo.com` | Official hackathon API gateway |
   | `GOOGLE_GENERATIVE_AI_API_KEY` | `<your-gemini-api-key>` | Google Gemini API key |
   | `GEMINI_MODEL` | `gemini-2.0-flash` | Fast Gemini model |
5. Click **"Deploy"**.

---

### Step 3: Verify Deployment

1. Vercel will build and assign you a live production URL (e.g., `https://cultural-radar.vercel.app`).
2. Open the URL and test the **"Explore Dubai Showcase"** flow.
3. Paste this live URL into the **"Try it out" / Live Site** field on your Devpost submission form!
