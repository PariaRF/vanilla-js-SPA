const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the client directory
app.use("/client", express.static(path.resolve(__dirname, 'client')));

// Route for index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
