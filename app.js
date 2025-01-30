const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// ✅ Load Environment Variables
dotenv.config();

// ✅ Connect to Database
connectDB();

// ✅ Initialize Express App
const app = express();

// ✅ Configure CORS
const corsOptions = {
  origin: 'https://food-client-nu.vercel.app',  // your frontend URL
  credentials: true,  // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions));

// ✅ Logging Middleware (For debugging)
app.use(morgan('dev'));

// ✅ Enable JSON Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Define Routes
app.get("/", (req, res) => {
  res.send("Welcome Guys!");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// ✅ Error Handling Middleware
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
