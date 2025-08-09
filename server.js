const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const downloadReportRoute = require('./routes/downloadReport');
const assessmentsRoute = require('./routes/assessments');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/download-report', downloadReportRoute);
app.use('/api/assessments', assessmentsRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL || 'your-local-connection', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
