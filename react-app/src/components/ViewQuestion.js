import React, { Component } from 'react';
import './ViewQuestion.css';

class ViewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.pt = "../specialq/"

  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/questions/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Question</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category_ID</th>
              <th>Difficulty_ID</th>
              <th>Question_Type</th>
              <th>Image</th>
              <th>Audio</th>
              <th>Question</th>
              <th>optiona</th>
              <th>optionb</th>
              <th>optionc</th>
              <th>optiond</th>
              <th>answera</th>
              <th>answerb</th>
              <th>answerc</th>
              <th>answerd</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.category_id}</td>
                      <td>{item.difficulty_id}</td>
                      <td>{item.question_type}</td>                      
                      
                      <td>
                      {
                        (item.image)
                        ? <img src={require("../specialq/"+(item.image))}></img>                                           
                        : <p>NA</p>
                      }
                      </td>
                      <td> 
                      {
                        (item.audio)
                        ? <audio src={require("../specialq/"+(item.audio))} controls> </audio>                                            
                        : <p>NA</p>
                      }</td>      

                      <td>{item.question}</td>                      
                      <td>{item.optiona}</td>
                      <td>{item.optionb}</td>
                      <td>{item.optionc}</td>
                      <td>{item.optiond}</td>
                      <td>{item.answera}</td>
                      <td>{item.answerb}</td>
                      <td>{item.answerc}</td>
                      <td>{item.answerd}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewQuestion;
