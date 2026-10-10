const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses Mongoose to establish a connection pool.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Modern mongoose (v6+) uses sensible defaults:
      // useNewUrlParser and useUnifiedTopology are enabled automatically.
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('💡 Hint: If using local MongoDB, ensure mongod is running.');
    console.error('💡 Hint: If using MongoDB Atlas, check your network access whitelist (0.0.0.0/0) and credentials in .env.');
    process.exit(1); // Stop server if database connection fails
  }
};

module.exports = connectDB;
