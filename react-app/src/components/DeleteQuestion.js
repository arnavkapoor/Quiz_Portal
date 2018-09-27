import React, { Component } from 'react';
import './DeleteQuestion.css';

class DeleteQuestion extends Component {
	constructor() {
		super();
		this.state = {
			formData: {
				ID: "",
			},

			deletesuccess: false,
			deletefail: false,
		}
		this.handleIDChange = this.handleIDChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.state.deletesuccess = false
		fetch(('http://localhost:8080/questions/' + this.state.formData.ID), {
			method: 'DELETE',
		})
			.then(response => {
				if (response.status >= 200 && response.status < 300){
					console.log(response.status)
					this.setState({deletesuccess :true})
				} else {
					this.setState({deletefail :true})
				}
			});
	}

	handleIDChange(event) {
		this.state.formData.ID = event.target.value;
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Delete a Qustion</h1>
				</header>
				<br /><br />
				<div className="formContainer">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label>Question-ID</label>
							<input type="text" className="form-control" value={this.state.ID} onChange={this.handleIDChange} />
						</div>

						<button type="submit" className="btn btn-default">Submit</button>
					</form>
				</div>
				{this.state.deletesuccess &&
					<div>
						<h2>
							Question Deleted Succesfully
						</h2>
					</div>
				}				
				{this.state.deletefail &&
					<div>
						<h2>
							No Such Question
						</h2>
					</div>
				}				
			</div>
		);
	}
}

export default DeleteQuestion;
