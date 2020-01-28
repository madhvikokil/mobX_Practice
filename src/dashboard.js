import React from 'react';
import { extendObservable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Tables from './tables';

export default observer(
class FormDialog extends React.Component{
    constructor(props) {
        super(props);
  
        extendObservable(this, {
          open: '',
          title: '',
          description:'',
          allData : []
        });
      }

   handleClickOpen = () => {
    this.open = true
    console.log("this.add Data : ", typeof this.allData);
    console.log("handle here");
  };

   handleClose = () => {
    this.open = false
    const { title, description } = this;
    console.log("title : ", title);
    console.log("description : ",description);
    console.log("handle there");
    let obj = {
        title : title,
        description : description
    }

    this.allData.push(obj);
    console.log(toJS(this.allData));
    
  };

  onChange = e => {
    console.log(e.target.value);
    const { name, value } = e.target;
    this[name] = value;
  };  

render(){
    const { title, description } = this;
    const user = localStorage.getItem('user');
    return(
        <div>
            <h2>Welcome {user}</h2>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Data
        </Button>
        
        <Dialog open={this.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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
              onChange={this.onChange}
              value={title}
            />
             <TextField
              name="description"
              autoFocus
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              onChange={this.onChange}
              value={description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        {/* {this.allData.length > 0 ?
         <Tables store={toJS(this.allData)} /> : 
        null
        } */}
         
      </div> 
    )
}
})