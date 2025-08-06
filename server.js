const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load .env variables
dotenv.config();
connectDB();

const app = express();

// ✅ Set CORS with allowed frontend domains
const allowedOrigins = [
  'https://batch3-coursehub-frontend.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());

// ✅ Base route for testing
app.get('/', (req, res) => {
  res.send('CourseHub Backend API is live!');
});

// API Routes
app.use('/api/assessments', require('./routes/assessmentRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/download-report', require('./routes/downloadReport'));

// Error Handler (always at bottom)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
