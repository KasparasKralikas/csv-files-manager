const path = require('path');
const express = require("express");
const TableManager = require('./tableManager.js');

const PORT = process.env.PORT || 8080;

const SERVER_SIDE_ERROR_MESSAGE = 'Something went wrong on the server side...';

const app = express();

const tableManager = new TableManager();

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/tables', async (_req, res) => {
  try {
    const names = await tableManager.getTableNames();
    res.status(200).json(names);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: SERVER_SIDE_ERROR_MESSAGE });
  }
});

app.get('/api/table/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const table = await tableManager.getTable(name);
    if (table === null) {
      res.status(404).json({ message: `Table named ${name} doesn't exist...` });
    }
    res.status(200).json(table);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: SERVER_SIDE_ERROR_MESSAGE });
  }
});

app.post('/api/table/:name', async (req, res) => {
  try {
    if (!req.body.hasOwnProperty('data')) {
      res.status(400).json({ message: 'Request body must contain data property' });
    }
    const name = req.params.name;
    const data = req.body.data;
    await tableManager.createTable(name, data);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: SERVER_SIDE_ERROR_MESSAGE });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});