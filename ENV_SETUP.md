# Environment Setup

## Create .env File

Create a `.env` file in the root directory of the project with the following content:

```env
PORT=5000
MONGODB_URI=mongodb+srv://mpb46_db_user:54QKpK5Y8knkwbtE@fashiontailor.jofes6l.mongodb.net/fashion-tailor?appName=FashionTailor
JWT_SECRET=your-secret-key-change-in-production
```

**Important Notes:**
1. The `.env` file is already in `.gitignore` so it won't be committed to version control
2. Make sure to add `/fashion-tailor` before the `?` in the MongoDB URI to specify the database name
3. Change the `JWT_SECRET` to a strong, random string in production

## MongoDB Connection String Format

Your connection string should look like:
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?appName=AppName
```

The server code will automatically handle the connection string format, but it's best to include the database name (`/fashion-tailor`) in the URI.

## Quick Setup

1. Create `.env` file in the root directory
2. Copy the content above and paste it into the file
3. Update `JWT_SECRET` with a secure random string
4. Save the file
5. Run `npm run dev` to start the application

