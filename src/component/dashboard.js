import React from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tables from '../component/table';
import { withRouter } from 'react-router-dom';

@inject('Crud')
@inject('LoginStore')
@observer
class FormDialog extends React.Component{
    constructor(props) {
        super(props);
      
        this.state = {
          open : '',
          close : true
        }
    }

  handleClickOpen = () => {
    this.setState({open : true})
  };

   handleClose = () => {
    const { Crud } = this.props;
    this.setState({open : false})
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
    this.setState({close : true})
    this.props.history.goBack();
  }

  closehandler =() => {
    this.setState({open : false})
  }
  cancelhandler =() =>{
    this.props.history.goBack();

  }

  logoutHandler =() => {
    localStorage.clear('user');
    this.props.LoginStore.logout();
    this.props.history.push("/");
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
            <Button variant="outlined" color="primary" style={{float:"right"}} onClick={this.logoutHandler}>
              Logout
            </Button>
        
          <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
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
              <Button onClick={this.closehandler} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog> 
          {this.props.match.path === '/dashboard/:id' ? 
          
          <Dialog open={this.state.close} aria-labelledby="form-dialog-title">
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
              <Button onClick={this.updateHandler} close={this.state.close}color="primary">
                update
              </Button>
              <Button onClick={this.cancelhandler}color="primary">
                Cancel
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