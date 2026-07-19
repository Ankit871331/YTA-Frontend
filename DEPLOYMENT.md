# Elite Taekwondo Academy - Deployment Guide

This project is built with a Vite + Express full-stack architecture.

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Environment Variables**:
   Create a `.env` file based on `.env.example`:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secure string for token signing.

3. **Run the App**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

4. **Seed Admin User**:
   To access the admin panel, you need an initial admin user. Send a POST request to:
   `http://localhost:3000/api/admin/seed`
   Default Credentials:
   - Username: `admin`
   - Password: `admin123`

## MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Get your connection string.
3. Add your IP address to the whitelist in the Network Access tab.
4. Create a database user and add the credentials to your `MONGODB_URI`.

## Deployment

### Backend (Render / Railway)
1. Connect your GitHub repository.
2. Set the build command: `npm run build`.
3. Set the start command: `npm start`.
4. Add your environment variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`).

### Frontend (Vercel)
1. Vercel will automatically detect the Vite project.
2. Ensure the output directory is set to `dist`.
3. Add the same environment variables if needed for client-side logic.

*Note: In this full-stack setup, the Express server serves the static Vite build in production.*
