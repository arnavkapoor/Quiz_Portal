import React, { Component } from 'react';
import './DeletePerson.css';

class DeletePerson extends Component {
	constructor() {
		super();
		this.state = {
			formData: {
				ID: "",
			},
			deletesuccess: false,
		}
		this.handleIDChange = this.handleIDChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.formData.ID)
		fetch(('http://localhost:8080/people/' + this.state.formData.ID), {
			method: 'DELETE',
		})
			.then(response => {
				if (response.status >= 200 && response.status < 300)
					this.setState({ deletesuccess: true });
			});
	}

	handleIDChange(event) {
		this.state.formData.ID = event.target.value;
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Delete a Person</h1>
				</header>
				<br /><br />
				<div className="formContainer">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label>ID</label>
							<input type="text" className="form-control" value={this.state.ID} onChange={this.handleIDChange} />
						</div>

						<button type="submit" className="btn btn-default">Submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default DeletePerson;
