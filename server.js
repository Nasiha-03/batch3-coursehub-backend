const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const downloadReportRoute = require('./routes/downloadReport');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/download-report', downloadReportRoute); // ✅ register the route

// MongoDB connect (use your URI)
mongoose.connect(process.env.MONGO_URL || 'your-local-connection', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
