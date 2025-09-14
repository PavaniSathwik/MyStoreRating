const express = require('express');
const cors = require('cors');
const { connectDB,sequelize  } = require('./db');
const { syncModels } = require('../models');
const storeRoutes = require("../routes/storeRoutes"); // adjust path if needed
const ratingRoutes = require("../routes/ratingRoutes");

sequelize.sync() // ✅ just sync without dropping tables
  .then(() => console.log("All tables synced!"))
  .catch(err => console.error("Error syncing tables:", err));



require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect DB & Sync models
connectDB().then(() => syncModels());

// Routes
app.use("/api/users", require("../routes/userRoutes")); // User registration
app.use("/api/admin", require("../routes/adminRoutes"));
 app.use("/api/stores", storeRoutes); // ← this line is crucial
app.use("/api/ratings", ratingRoutes);
app.get('/', (req, res) => res.send('API running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
