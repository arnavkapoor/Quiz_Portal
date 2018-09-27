import React, { Component } from 'react';
import './Leaderboard.css';

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            rendered: [],
        }
        this.categorysel = "All"
        this.updatedata = this.updatedata.bind(this);
        this.handleCChange = this.handleCChange.bind(this);

    }

    handleCChange(event) {
        this.categorysel = event.target.value;
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/leaderboard/');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    viewmyscores(event) {
        this.state.rendered = []
        var info = JSON.parse(window.localStorage.getItem('logininfo'));
        var myuser = info.name

        for (let index = 0; index < this.state.data.length; index++) {
            var mycat = this.categorysel
            var element = this.state.data[index];
            if (element.username == myuser && (mycat == "All" || mycat == element.category_id))
                this.state.rendered.push(element)
        }
        this.forceUpdate()
    }

    viewallscores(event) {
        var mycat = this.categorysel
        this.state.rendered = []
        for (let index = 0; index < this.state.data.length; index++) {
            var element = this.state.data[index];            
            if(mycat == "All" || mycat == element.category_id )
                this.state.rendered.push(element)    
        }
        this.forceUpdate()
    }

    updatedata(event) {
        for (let index = 0; index < this.state.data.length; index++) {
            const element = this.state.data[index];
            if (element.category_id == "1")
                element.category_id = "Maths"
            if (element.category_id == "2")
                element.category_id = "GK"

            if (element.difficulty_id == "1")
                element.difficulty_id = "Easy"
            if (element.difficulty_id == "2")
                element.difficulty_id = "Hard"
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.submitted = true
        this.render()
        fetch('http://localhost:8080/filterquestions/', {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
            .then(response => response.json())
            .then(data => this.setState({ data: data }))
    }


    //   handleSubmit (event) {
    //     event.preventDefault();
    //     this.state.submitted = true
    //     this.render()
    //     fetch('http://localhost:8080/filterquestions/', {
    //     method: 'POST',
    //     body: JSON.stringify(this.state.formData),
    //    })
    //       .then(response =>  response.json())
    //         .then(data => this.setState({data: data}))
    //     }

    //   quizSubmit (event) {
    //       for (let index = 0; index < this.state.data.length; index++) 
    //       {
    //         const element = this.state.data[index];

    //         const id1 = element.id+"a"
    //         const id2 = element.id+"b"
    //         const id3 = element.id+"c"
    //         const id4 = element.id+"d"

    //         const ansa = element.answera
    //         const ansb = element.answerb
    //         const ansc = element.answerc
    //         const ansd = element.answerd


    //         const sela = document.getElementById(id1).checked.toString()
    //         const selb = document.getElementById(id2).checked.toString()
    //         const selc = document.getElementById(id3).checked.toString()
    //         const seld = document.getElementById(id4).checked.toString()

    //         if (sela == false && selb == false && selc == false && seld == false)
    //             this.state.unattempted +=1;


    //         else if (ansa == sela && ansb == selb && ansc == selc && ansd == seld ) 
    //             this.state.correct +=1;

    //         else 
    //             this.state.incorrect +=1;
    //       }
    //       this.state.quizsubmit = true     
    //       this.forceUpdate()
    //     }


    //   handleCChange(event) {
    //     this.state.formData.category_id = event.target.value;
    //   }
    //   handleDChange(event) {
    //     this.state.formData.difficulty_id = event.target.value;
    //   }


    // render() {

    //   if(this.state.quizsubmit === false)
    //   {
    //     return (
    //       <div className="App">
    //         <header className="App-header">
    //           <h1 className="App-title">Select A Quiz</h1>
    //         </header>
    //         <br/><br/>
    //         <div className="formContainer">
    //           <form onSubmit={this.handleSubmit}>
    //             <div className="form-group">
    //                 <select defaultValue={this.state.formData.category_id} 
    //                     onChange={this.handleCChange}
    //                     >
    //                     <option value="1">Maths</option>
    //                     <option value="2">GK</option>
    //                 </select>
    //                     <p>Select a Category</p>
    //             </div>
    //             <div className="form-group">
    //                 <select defaultValue={this.state.formData.difficulty_id} 
    //                         onChange={this.handleDChange}
    //                     >
    //                     <option value="1">Easy</option>
    //                     <option value="2">Tough</option>
    //                 </select>
    //                     <p>Select a Difficulty</p>
    //             </div>

    //              <button type="submit" className="btn btn-default" >Submit</button>

    //             </form>
    //         </div>
    //         <div className="App">
    //             {this.state.data.map(function(item, key) {
    //                 return (

    //                 <div className = "list-group" key = {key}>

    //                     <h1 className ="list-group-item">{item.question}</h1>
    //                         <input type="checkbox" className="cbox" id={item.id+"a"}/><span><h3>{item.optiona}</h3></span>
    //                         <input type="checkbox" className="cbox" id={item.id+"b"}/><span><h3>{item.optionb}</h3></span>
    //                         <input type="checkbox" className="cbox" id={item.id+"c"}/><span><h3>{item.optionc}</h3></span>
    //                         <input type="checkbox" className="cbox" id={item.id+"d"}/><span><h3>{item.optiond}</h3></span>
    //                 </div>
    //                 )
    //             })}
    //             {
    //               this.state.submitted == true && 
    //               <button onClick={(e)=>this.quizSubmit(e)} className="btn btn-default" >Submit Quiz</button>              
    //             }

    //         </div>
    //         </div>

    //     );
    //     }
    //     return(
    //       <div>
    //            {
    //    this.state.quizsubmit == true &&
    //      <div>

    //        <h3> Correct: {this.state.correct}  </h3>
    //        <h3> Incorrect: {this.state.incorrect}  </h3>
    //        <h3> Unattempted: {this.state.unattempted}  </h3>
    //        <h3> Score : {this.state.score = (this.state.correct * 10) - (this.state.incorrect * 5) } </h3>

    //      </div>
    //    }

    //       </div>
    //     )
    render() {
        this.updatedata()
        return (

            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">View All People</h1>
                </header>
                <div>
                    <button onClick={(e) => this.viewmyscores(e)} className="btn btn-default"> My Scores </button>
                    <p>     </p>
                    <button onClick={(e) => this.viewallscores(e)} className="btn btn-default"> Global Leaderboard </button>
                </div>
                <div>
                    <select defaultValue="All"
                        onChange={this.handleCChange}
                    >
                        <option value="All">All</option>
                        <option value="Maths">Maths</option>
                        <option value="GK">GK</option>
                    </select>
                </div>
                <table className="table-hover">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Category</th>
                            <th>Difficulty</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.rendered.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{item.username}</td>
                                <td>{item.category_id}</td>
                                <td>{item.difficulty_id}</td>
                                <td>{item.score}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}



export default Leaderboard;


