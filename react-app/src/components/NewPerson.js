import React, { Component } from 'react';
import './NewPerson.css';

class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        email: "",
        password: "",
      },
      submitted: false,
      already: false,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {

    event.preventDefault();
    fetch('http://localhost:8080/people', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
        else
          this.setState({already: true});
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
          <h1 className="App-title">Create a New Person</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>UserName</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
            </div>
            <div className="form-group">
                <label>Email-Id</label>
                <input type="text" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New person successfully added.
            </h2>
          </div>
        }
        {this.state.already &&
          <div>
            <h2>
              UserName already exists
            </h2>
          </div>
        }
      </div>
    );
  }
}

export default NewPerson;
