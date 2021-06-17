import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CSVUploader from './components/CSVUploader';
import TableView from './components/TableView';

function App() {

  const [data, setData] = useState();
  const [name, setName] = useState();
  const [tableNames, setTableNames] = useState();

  useEffect(() => {
    getTables();
  }, []);

  const getTable = (name) => {
    axios.get(`/api/table/${name}`).then(res => {
      setData(res.data.data);
      setName(res.data.name);
    }).catch(error => {
      // TODO: add alert that displays the error
      console.log(error);
    });
  };

  const getTables = () => {
    axios.get(`/api/tables`).then(res => {
      console.log(res);
      setTableNames(res.data);
    }).catch(error => {
      // TODO: add alert that displays the error
      console.log(error);
    });
  };

  const postTable = (name, data) => {
    axios.post(`/api/table/${name}`, {
      data: data
    }).then(() => {
      getTables();
    }).catch(error => {
      // TODO: add alert that displays the error
      console.log(error);
    });
  };

  return (
    <div>
      <CSVUploader setData={setData} />
      <TableView data={data} />
    </div>
  );
}

export default App;
