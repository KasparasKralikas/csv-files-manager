const path = require('path');
const express = require("express");
const TableManager = require('./tableManager.js');

const PORT = process.env.PORT || 8080;

const app = express();

const tableManager = new TableManager();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "TODO" });
  });

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});