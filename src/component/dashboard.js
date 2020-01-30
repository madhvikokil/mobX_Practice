import React from 'react';
import { extendObservable, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tables from '../component/table';
import { withRouter } from 'react-router-dom';
import './dashboard.css';

@inject('Crud')
@observer
class FormDialog extends React.Component{
    constructor(props) {
        super(props);
  
        extendObservable(this, {
          open: '',
          close: true
       });
      }

  handleClickOpen = () => {
    this.open = true
  };

   handleClose = () => {
    const { Crud } = this.props;
    this.open = false
    const x = Math.floor((Math.random() * 100) + 1);
    let obj = {
        title : Crud.title,
        description : Crud.description,
        id : x
    }

    Crud.allData.push(obj);
    Crud.title = "";
    Crud.description ="";
      
  };

  updateHandler =() => {
    this.props.Crud.updateAllData(this.props.match.params.id)
    this.close  = true
    this.props.history.goBack();
  }

render(){
    const { Crud } = this.props;
    const user = localStorage.getItem('user');
    let a = toJS(Crud.allData);
    
    return(
        <div>
            <h2>Welcome {user}</h2>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Data
        </Button>
        
        <Dialog open={this.open} aria-labelledby="form-dialog-title">
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
              onChange={(e) =>Crud.changeTitle(e.target.value)}
            />
             <TextField
              name="description"
              autoFocus
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              onChange={(e) =>Crud.changeDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog> 
        {this.props.match.path === '/dashboard/:id' ? 
        <Dialog open={this.close} aria-labelledby="form-dialog-title">
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
              value={Crud.title}
              onChange={(e) =>Crud.changeTitle(e.target.value)} />
             <TextField
              name="description"
              autoFocus
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={Crud.description}
              onChange={(e) =>Crud.changeDescription(e.target.value)}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.updateHandler} close={this.close}color="primary">
              update
            </Button>
          </DialogActions>
        </Dialog> : null}

        {this.props.Crud.allData.length > 0 ?
         <Tables data={a}/> : 
        null
        }
         
      </div> 
    )
  }
}

export default withRouter(FormDialog);