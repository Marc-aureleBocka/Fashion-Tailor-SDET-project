# Fashion Tailor - AI-Powered Outfit Recommendation Web App

A full-stack web application that helps users discover and manage outfits tailored to their style preferences. Built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure registration and login system
- **Virtual Wardrobe**: Add and manage your clothing items digitally
- **Outfit Generator**: Create outfits from your wardrobe or get AI-generated suggestions
- **Style Selection**: Choose from predefined styles or customize your own preferences
- **Outfit Inspirations**: Import outfit images and find similar pieces from online retailers
- **Profile Management**: Customize your profile with preferred styles

## Technology Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fashion-tailor-app
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fashion-tailor
   JWT_SECRET=your-secret-key-change-in-production
   ```

   Create a `.env` file in the `client` directory (optional):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using a local installation:
   ```bash
   mongod
   ```

   Or use MongoDB Atlas (cloud) and update the `MONGODB_URI` in your `.env` file.

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

**Backend:**
```bash
npm run server
```

**Frontend:**
```bash
npm run client
```

The backend will run on `http://localhost:5000`
The frontend will run on `http://localhost:3000`

## Project Structure

```
fashion-tailor-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Auth)
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main App component
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   └── index.js            # Server entry point
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Wardrobe
- `GET /api/wardrobe` - Get all wardrobe items
- `GET /api/wardrobe/:id` - Get specific item
- `POST /api/wardrobe` - Add new item
- `PUT /api/wardrobe/:id` - Update item
- `DELETE /api/wardrobe/:id` - Delete item
- `GET /api/wardrobe/category/:category` - Get items by category

### Outfits
- `GET /api/outfits` - Get all outfits
- `GET /api/outfits/:id` - Get specific outfit
- `POST /api/outfits` - Create outfit
- `POST /api/outfits/generate` - Generate outfit from wardrobe
- `PUT /api/outfits/:id` - Update outfit
- `DELETE /api/outfits/:id` - Delete outfit

### Inspirations
- `GET /api/inspirations` - Get all inspirations
- `GET /api/inspirations/:id` - Get specific inspiration
- `POST /api/inspirations` - Import inspiration
- `PUT /api/inspirations/:id` - Update inspiration
- `DELETE /api/inspirations/:id` - Delete inspiration

## Database Schema

### User
- name, email, password
- preferredStyles (array)
- timestamps

### WardrobeItem
- userId, category, color, brand
- imageUrl, metadata
- timestamps

### Outfit
- userId, name, style
- itemIds (array of references)
- timestamps

### ImportedInspiration
- userId, imageUrl
- extractedItems, matchedRecommendations
- timestamps

## Future Enhancements

- Image upload functionality (currently uses URLs)
- Advanced AI/ML integration for outfit recommendations
- Integration with fashion APIs for real shopping links
- Image recognition for automatic clothing detection
- Social features (sharing outfits, following users)
- Outfit calendar/planner

## License

ISC

