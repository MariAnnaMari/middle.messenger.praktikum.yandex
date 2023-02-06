const path = require('path');
const express = require('express');
const app = express();
const port = 4000;

app.use(express.static('dist'));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
