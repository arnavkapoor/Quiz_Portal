import React, { Component } from 'react';
import './NewQuestion.css';

class NewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        category_id:"",
        difficulty_id:"",
        question_type:"2",
        image: "",
        audio: "",
        question:"",
        optiona:"",
        optionb:"",
        optionc:"",
        optiond:"",
        answera:"",
        answerb:"",
        answerc:"",
        answerd:"",    
        },
      single:false,
      submitted: false,
      already: false,
    }
    
    this.handleCChange = this.handleCChange.bind(this);
    this.handleDChange = this.handleDChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleOptChange = this.handleOptChange.bind(this);

    this.handleOptionaChange = this.handleOptionaChange.bind(this);
    this.handleOptionbChange = this.handleOptionbChange.bind(this);
    this.handleOptioncChange = this.handleOptioncChange.bind(this);
    this.handleOptiondChange = this.handleOptiondChange.bind(this);
    this.handleIChange = this.handleIChange.bind(this);
    this.handleAChange = this.handleAChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    this.state.formData.image = this.state.formData.image.replace("C:\\fakepath\\", "");
    this.state.formData.audio = this.state.formData.audio.replace("C:\\fakepath\\", "");
    this.state.formData.answera = this.refs.checka.checked.toString()
    this.state.formData.answerb = this.refs.checkb.checked.toString()
    this.state.formData.answerc = this.refs.checkc.checked.toString()
    this.state.formData.answerd = this.refs.checkd.checked.toString()
    this.setState({submitted: false});
    this.setState({already: false});
    
    event.preventDefault();
    fetch('http://localhost:8080/addq', {
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

  handleCChange(event) {
    this.state.formData.category_id = event.target.value;
  }
  handleDChange(event) {
    this.state.formData.difficulty_id = event.target.value;
  }
  handleQChange(event) {
    this.state.formData.question = event.target.value;
  }

  handleIChange(event) {
    this.state.formData.image = event.target.value;
    }
    
    handleAChange(event) {
        this.state.formData.audio = event.target.value;
        }

  handleOptChange(event) {
    this.state.formData.question_type = event.target.value;
    if(this.state.formData.question_type == "1")
        this.single=true;
    else    
        this.single=false;

    this.forceUpdate()
    }
  
  handleOptionaChange(event) {
      this.state.formData.optiona = event.target.value;
  }
  handleOptionbChange(event) {
    this.state.formData.optionb = event.target.value;
}

handleOptioncChange(event) {
    this.state.formData.optionc = event.target.value;
} 

handleOptiondChange(event) {
    this.state.formData.optiond = event.target.value;
}
render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/><br/>
        <div className="formContainer">

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Category-Id</label>
                <input type="text" className="form-control" value={this.state.category_id} onChange={this.handleCChange}/>
            </div>
            <div className="form-group">
                <label>Difficulty-Id</label>
                <input type="text" className="form-control" value={this.state.difficulty_id} onChange={this.handleDChange}/>
            </div>
            
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange}/>
            </div>
            <div className="form-group">
                <select defaultValue={this.state.formData.category_id} 
                    onChange={this.handleOptChange}
                    >
                    <option value="2">Multiple Correct</option>
                    <option value="1">Single Correct</option>
                </select>
                    <p>Select a type</p>
            </div>
            <div><label>Images</label>
                <input type="file" value={this.state.image} onChange={this.handleIChange}/> 
            </div>
            <div><label>Audio</label>
                <input type="file" value={this.state.audio} onChange={this.handleAChange}/> 
            </div>

            <div className="form-group">
                <label>Option A</label>
                <input type="text" className="form-control" value={this.state.optiona} onChange={this.handleOptionaChange}/>
            </div>
            
            

            <div className="form-group">
                <label>Option B</label>
                <input type="text" className="form-control" value={this.state.optionb} onChange={this.handleOptionbChange}/>
            </div>

            <div className="form-group">
                <label>Option C</label>
                <input type="text" className="form-control" value={this.state.optionc} onChange={this.handleOptioncChange}/>
            </div>

            <div className="form-group">
                <label>Option D</label>
                <input type="text" className="form-control" value={this.state.optiond} onChange={this.handleOptiondChange}/>
            </div>

            <div className="form-group">
                <label>Option A</label>
                { this.single ?  (
                <input type="radio" name="action" className="form-control" ref="checka"/>
                ) : (
                    <input type="checkbox" className="form-control" ref="checka"/>        
                )
                }
            </div>

            <div className="form-group">
                <label>Option B</label>
                { this.single ?  (
                <input type="radio" name="action" className="form-control" ref="checkb"/>
                ) : (
                    <input type="checkbox" className="form-control" ref="checkb"/>        
                )
                }
            </div>

            <div className="form-group">
                <label>Option C</label>
                { this.single ?  (
                <input type="radio"  name="action" className="form-control" ref="checkc"/>
                ) : (
                    <input type="checkbox" className="form-control" ref="checkc"/>        
                )
                }
            </div>

            <div className="form-group">
                <label>Option D</label>
                { this.single ?  (
                <input type="radio" name="action" className="form-control" ref="checkd"/>
                ) : (
                    <input type="checkbox" className="form-control" ref="checkd"/>        
                )
                }
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
            {this.state.submitted &&
            <div>
                <h2>
                New question successfully added.
                </h2>
            </div>
            }
            {this.state.already &&
            <div>
                <h2>
                Question already exists
                </h2>
            </div>
            }
        </div>
      </div>
    );
    }
}

export default NewQuestion;
