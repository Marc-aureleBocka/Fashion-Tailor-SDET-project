# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Step-by-Step Setup

1. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fashion-tailor
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

   For MongoDB Atlas (cloud):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fashion-tailor
   ```

3. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   # Windows
   mongod
   
   # macOS/Linux
   sudo mongod
   ```

   Or use MongoDB Atlas (no local installation needed).

4. **Run the Application**
   
   To run both frontend and backend:
   ```bash
   npm run dev
   ```
   
   Or run separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## First Steps

1. Register a new account at http://localhost:3000/register
2. Login and set your preferred styles in Profile
3. Add items to your Wardrobe
4. Generate or create outfits
5. Import outfit inspirations

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (if using local)
- Check your `MONGODB_URI` in `.env`
- Verify network access if using MongoDB Atlas

### Port Already in Use
- Change `PORT` in `.env` for backend
- Change port in `client/package.json` scripts for frontend

### CORS Errors
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in client `.env` (optional, defaults to localhost:5000)

