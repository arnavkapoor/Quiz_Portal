import React, { Component } from 'react';
import './DeleteQuiz.css';

class DeleteQuiz extends Component {
	constructor() {
		super();
		this.state = {
			formData: {
                category_id: "",
                difficulty_id:"",
			},

			deletesuccess: false,
			deletefail: false,
        }
        
		this.handleCChange = this.handleCChange.bind(this);        
		this.handleDChange = this.handleDChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.state.deletesuccess = false
		fetch(('http://localhost:8080/delquiz'), {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
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

	handleCChange(event) {
		this.state.formData.category_id = event.target.value;
	}

	handleDChange(event) {
		this.state.formData.difficulty_id = event.target.value;
    }
    
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Delete a Quiz</h1>
				</header>
				<br /><br />
				<div className="formContainer">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label>Category_ID</label>
							<input type="text" className="form-control" value={this.state.category_id} onChange={this.handleCChange} />
						</div>
                        <div className="form-group">
							<label>Difficulty_ID</label>
							<input type="text" className="form-control" value={this.state.difficulty_id} onChange={this.handleDChange} />
						</div>
						<button type="submit" className="btn btn-default">Submit</button>
					</form>
				</div>
				{this.state.deletesuccess &&
					<div>
						<h2>
							Quiz Deleted Succesfully
						</h2>
					</div>
				}				
				{this.state.deletefail &&
					<div>
						<h2>
							No Such Quiz
						</h2>
					</div>
				}				
			</div>
		);
	}
}

export default DeleteQuiz;
