const express = require('express');
const graphRoutes = require('./routes/graphRoutes');
const errorHandler = require('./utils/errorHandler');
const cors = require('cors');


const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'http://192.168.178.199:8080/' ]// Allow only your frontend origin
}));

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/graph', graphRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
