import React, { Component } from 'react';
import { observer, inject }  from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('LoginStore')
@observer
class App extends Component {
 
  handleSubmit = (e) => {
    e.preventDefault();
    const email = this.email.value;
    this.props.LoginStore.addEmail(email);
    const password = this.password.value;
    this.props.LoginStore.addPassword(password);
    this.password.value="";
    this.email.value=""
    this.props.history.push('./dashboard');
  }
  render() {
    const { LoginStore } = this.props;
    return (
      <div>
    <h2> Get Details : {LoginStore.details}</h2>
      <form onSubmit={e => this.handleSubmit(e)}>
        <input type="text" placeholder="Enter Email" ref={input =>this.email = input} /><br />
        <input type="text" placeholder="Enter Password" ref={input =>this.password = input} /><br />
        <button>Submit</button>
      </form>
        
      </div>
    );
  }
}
export default withRouter(App);