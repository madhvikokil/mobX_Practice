import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { inject } from 'mobx-react';

@inject('Crud')
class Edit extends React.Component{

    state ={
        open : true
    }
    // console.log(this.props);

    render(){
        return(
            <>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogContentText>
              Add Data Contents
            </DialogContentText>
            <TextField
              name="title"
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              onChange={this.onChangeTitle}
            />
             <TextField
              name="description"
              autoFocus
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              onChange={this.onChangeDescription}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        </>
        )
    }
}

export default Edit;