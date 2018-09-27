import React, { Component } from 'react';
import './NewPerson.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        password: " ",
      },
      invalidlogin: false,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
      var string = {
        name: this.state.formData.username,
        privilege: 1,
      }
      
      event.preventDefault();
      fetch('http://localhost:8080/login', {
       method: 'POST',
       body: JSON.stringify(this.state.formData),
     })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
        {  
          if(string.name == "admin")
            string.privilege = 2;
          localStorage.setItem('logininfo', JSON.stringify(string));
          window.location.assign("/")
        }
        else
          this.setState({invalidlogin: true});
      });
    }
  
  handleUChange(event) {
    this.state.formData.username = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.email = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>UserName</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange} required/>
            </div>
            
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange} required/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.invalidlogin &&
          <div>
            <h2>
                Invalid Login Credentials     
            </h2>
          </div>
        }

      </div>
    );
  }
}

export default Login;
