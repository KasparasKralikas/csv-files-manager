import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function TableView({ data }) {

    const HeadTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const BodyTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    return (
        <div>
            {data && data.length ?
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow key="headRow">
                                {data[0].data.map((cell, index) => {
                                    return <HeadTableCell key={index}>{cell}</HeadTableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(1, data.length).map((row, rowIndex) => {
                                return (
                                    <BodyTableRow key={rowIndex}>
                                        {
                                            row.data.map((cell, index) => {
                                                return <TableCell key={index}>{cell}</TableCell>
                                            })
                                        }
                                    </BodyTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <h3>No data</h3>
            }
        </div>
    );
}

export default TableView;