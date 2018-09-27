import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        category_id:"1",
        difficulty_id:"1",
        },
        sendData:{
          username:"",
          category_id:"",
          difficulty_id:"",
          score:""
        },
      data: [],
      submitted: false,
      quizsubmit: false,
      correct : 0,
      incorrect : 0,
      unattempted : 0,
      score: 0,
    }

    this.handleCChange = this.handleCChange.bind(this);
    this.handleDChange = this.handleDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit (event) {
    event.preventDefault();
    this.state.submitted = true
    this.render()
    fetch('http://localhost:8080/filterquestions/', {
    method: 'POST',
    body: JSON.stringify(this.state.formData),
   })
      .then(response =>  response.json())
        .then(data => this.setState({data: data}))
    }

  quizSubmit (event) {
      for (let index = 0; index < this.state.data.length; index++) 
      {
        const element = this.state.data[index];
        
        const id1 = element.id+"a"
        const id2 = element.id+"b"
        const id3 = element.id+"c"
        const id4 = element.id+"d"
        
        const ansa = element.answera
        const ansb = element.answerb
        const ansc = element.answerc
        const ansd = element.answerd

        const sela = document.getElementById(id1).checked.toString()
        const selb = document.getElementById(id2).checked.toString()
        const selc = document.getElementById(id3).checked.toString()
        const seld = document.getElementById(id4).checked.toString()
                
        if (sela == "false" && selb == "false" && selc == "false" && seld == "false")
            this.state.unattempted +=1;        
        
        else if (ansa == sela && ansb == selb && ansc == selc && ansd == seld ) 
            this.state.correct +=1;
        else 
            this.state.incorrect +=1;
      }
      
      var info = JSON.parse(window.localStorage.getItem('logininfo'));
      this.state.quizsubmit = true
      this.state.score = (this.state.correct * 10) - (this.state.incorrect * 5)
      
      this.state.sendData.username = info.name
      this.state.sendData.category_id = this.state.formData.category_id
      this.state.sendData.difficulty_id = this.state.formData.difficulty_id
      this.state.sendData.score = this.state.score.toString()
      
      console.log(this.state.sendData)
      fetch('http://localhost:8080/leaderboardupdate/', {
      method: 'POST',
      body: JSON.stringify(this.state.sendData),
       })

      this.forceUpdate()
    }


  handleCChange(event) {
    this.state.formData.category_id = event.target.value;
  }
  handleDChange(event) {
    this.state.formData.difficulty_id = event.target.value;
  }
  
  
render() {
  
  if(this.state.quizsubmit === false)
  {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select A Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <select defaultValue={this.state.formData.category_id} 
                    onChange={this.handleCChange}
                    >
                    <option value="1">Maths</option>
                    <option value="2">GK</option>
                </select>
                    <p>Select a Category</p>
            </div>
            <div className="form-group">
                <select defaultValue={this.state.formData.difficulty_id} 
                        onChange={this.handleDChange}
                    >
                    <option value="1">Easy</option>
                    <option value="2">Tough</option>
                </select>
                    <p>Select a Difficulty</p>
            </div>
              
             <button type="submit" className="btn btn-default" >Submit</button>
              
            </form>
        </div>
        <div className="App">
            {this.state.data.map(function(item, key) {
                return (

                <div className = "list-group" key = {key}>
                    <h2 className ="list-group-item">{item.question}</h2>
                      {
                        (item.image)
                        ? <img src={require("../specialq/"+(item.image))}></img>                                           
                        : <p>Image:NA</p>
                      }
                        <br></br>
                        {
                        (item.audio)
                        ? <audio src={require("../specialq/"+(item.audio))} controls> </audio>                                            
                        : <p>Audio:NA</p>
                      } <br></br>
                        <label>{item.optiona}&nbsp;&nbsp;&nbsp;&nbsp;
                        {
                         (item.question_type=="2") 
                         ? <input type="checkbox" className="cbox" id={item.id+"a"}/>
                         : <input type="radio" name={"action"+item.id} className="cbox" id={item.id+"a"}/>
                        }
                          </label>
                        <br></br>
                        <label>{item.optionb}&nbsp;&nbsp;&nbsp;&nbsp;
                        {
                         (item.question_type=="2") 
                         ? <input type="checkbox" className="cbox" id={item.id+"b"}/>
                         : <input type="radio" name={"action"+item.id} className="cbox" id={item.id+"b"}/>
                        }
                        </label>
                        <br></br>
                        <label>{item.optionc}&nbsp;&nbsp;&nbsp;&nbsp;
                        {
                         (item.question_type=="2") 
                         ? <input type="checkbox" className="cbox" id={item.id+"c"}/>
                         : <input type="radio" name={"action"+item.id} className="cbox" id={item.id+"c"}/>
                        }
                        </label>
                        <br></br>
                        <label>{item.optiond}&nbsp;&nbsp;&nbsp;&nbsp;
                        {
                         (item.question_type=="2") 
                         ? <input type="checkbox" className="cbox" id={item.id+"d"}/>
                         : <input type="radio" name={"action"+item.id} className="cbox" id={item.id+"d"}/>
                        }
                        </label>
                </div>
                )
            })}
            {
              this.state.submitted == true && 
              <button onClick={(e)=>this.quizSubmit(e)} className="btn btn-default" >Submit Quiz</button>              
            }
            
        </div>
        </div>
         
    );
    }
    return(
      <div>
           {
   this.state.quizsubmit == true &&
     <div>
       
       <h3> Correct: {this.state.correct}  </h3>
       <h3> Incorrect: {this.state.incorrect}  </h3>
       <h3> Unattempted: {this.state.unattempted}  </h3>
       <h3> Score : {this.state.score}  </h3>
       
     </div>
   }

      </div>
    )
  }
}


export default Dashboard;


