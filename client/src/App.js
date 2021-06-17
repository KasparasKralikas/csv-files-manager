import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TableView from './components/TableView';
import TableSelector from './components/TableSelector';

function App() {

  const [data, setData] = useState();
  const [name, setName] = useState();
  const [tableNames, setTableNames] = useState();
  const [tableSelectorDialogOpen, setTableSelectorDialogOpen] = useState(true);

  useEffect(() => {
    getTables();
  }, []);

  const getTable = (name) => {
    axios.get(`/api/table/${name}`).then(res => {
      setData(res.data.data);
      setName(res.data.name);
      setTableSelectorDialogOpen(false);
    }).catch(error => {
      // TODO: add alert that displays the error
      console.log(error);
    });
  };

  const getTables = () => {
    axios.get(`/api/tables`).then(res => {
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

  const handleTableNameClick = () => {
    console.log()
    setTableSelectorDialogOpen(true);
  }

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
        <Button onClick={handleTableNameClick} variant="contained" color="primary" style={{
            marginRight: "20px",
            width: "150px"
          }}>
            Browse
          </Button>
          <Typography>{name ? name : "No table selected..."}</Typography>
        </Toolbar>
      </AppBar>
      <TableSelector tableSelectorDialogOpen={tableSelectorDialogOpen} setTableSelectorDialogOpen={setTableSelectorDialogOpen} data={data} setData={setData} postTable={postTable} tableNames={tableNames} getTable={getTable} />
      <TableView data={data} />
    </div>
  );
}

export default App;
