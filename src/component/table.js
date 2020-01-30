import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import { inject } from 'mobx-react';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function DenseTable(props) {
  const classes = useStyles();
  
  const deletehandler =(id) =>{
    props.Crud.deleteData(id);
  }

  const editHandler =(id,title,desc) => {
    props.Crud.title = title;
    props.Crud.description = desc;
    props.history.push(`/dashboard/${id}`)
  }

  console.log("allData : ", props.Crud.allData);
  return(
    
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell> Title </TableCell>
            <TableCell> Description </TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
          {props.Crud.allData.map(row => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <button onClick={() => deletehandler(row.id)}> Delete </button>
              <button onClick={() => editHandler(row.id, row.title, row.description)}> Edit </button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default inject('Crud')(withRouter(DenseTable))
