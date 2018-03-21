const path = require('path');
const express = require('express');

const public = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(public));

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});