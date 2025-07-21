const express = require('express');
const userRoutes = require('./routes/userRoutes.js')
const healthCheck = require('./controllers/healthController.js');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', userRoutes);
app.get("/health", healthCheck);


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
