const express = require('express');
const app = express();
const eventRoutes = require('./routes/event'); 
app.use(express.json());
app.use('/api/events', eventRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
