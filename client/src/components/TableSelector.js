import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import CSVUploader from './CSVUploader';

function TableSelector({ tableSelectorDialogOpen, setTableSelectorDialogOpen, data, setData, postTable, tableNames, getTable }) {

    const [inputTableName, setInputTableName] = useState();

    const handleDialogClose = () => {
        setTableSelectorDialogOpen(false);
    };

    const handleUploadClick = () => {
        postTable(inputTableName, data);
    };

    const handleListItemClick = (name) => {
        getTable(name);
    };

    return (
        <Dialog onClose={handleDialogClose} open={tableSelectorDialogOpen}>
            <DialogTitle>Upload New Table:</DialogTitle>
            <Box m={1}>
                <CSVUploader setData={setData} />
            </Box>
            <Box m={1}>
                <TextField label="Table name" onChange={(e) => setInputTableName(e.target.value)}></TextField>
                <Button variant="contained" color="primary" disabled={inputTableName && data ? false : true} onClick={handleUploadClick}>Upload Table</Button>
            </Box>
            <Box m={1}>
                <DialogTitle>Or Select Existing Table:</DialogTitle>
                <List>
                    {tableNames ? tableNames.map(name => <ListItem button onClick={() => handleListItemClick(name)} key={name}>{name}</ListItem>) : "No tables found"}
                </List>
            </Box>
        </Dialog>
    );
}

export default TableSelector