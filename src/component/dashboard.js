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

@inject('Crud')
@observer
class FormDialog extends React.Component{
    constructor(props) {
        super(props);
  
        extendObservable(this, {
          open: ''
        });
      }
      state ={
        open : true,
       
      }

   handleClickOpen = () => {
    this.open = true
    
    console.log("this.add Data : ", typeof this.allData);
    console.log("handle here");
  };

   handleClose = () => {
    const { Crud } = this.props;
    this.open = false
    console.log(Crud.title);
    console.log(Crud.description);
    console.log("title : ",this.title);
    const x = Math.floor((Math.random() * 100) + 1);
    let obj = {
        title : Crud.title,
        description : Crud.description,
        id : x
    }

    console.log(this.props.Crud.allData.push(obj));
    console.log(toJS(Crud.allData));
      
  };

  updateHandler =() => {
    this.props.Crud.updateAllData(this.props.match.params.id,this.props.Crud.title,this.props.Crud.description )
       this.setState({open : false})
       this.props.history.goBack();
    
  }

  onChangeTitle = e => {
    console.log(e.target.value);
    this.props.Crud.changeTitle(e.target.value);
  };  

  onChangeDescription = e => {
    console.log(e.target.value);
    this.props.Crud.changeDescription(e.target.value);
  }
 
render(){
    const { Crud } = this.props;
    const user = localStorage.getItem('user');
    let a =toJS(this.props.Crud.allData);
    let titleValue;
    let decriptionValue;
    let storeID = this.props.match.params.id;
    for(let i=0;i<Crud.allData.length;i++) {
      if(Crud.allData[i].id == storeID){
        titleValue = Crud.allData[i].title;
        decriptionValue = Crud.allData[i].description;
    }
    }
    return(
        <div>
            <h2>Welcome {user}</h2>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Data
        </Button>
        
        <Dialog open={this.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
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
        {this.props.match.path === '/dashboard/:id' ? 
        <Dialog open={this.state.open} onClose={this.updateHandler} aria-labelledby="form-dialog-title">
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
              value={titleValue}
              onChange={this.onChangeTitle}
            />
             <TextField
              name="description"
              autoFocus
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={decriptionValue}
              onChange={this.onChangeDescription}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.updateHandler} close={this.state.close}color="primary">
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