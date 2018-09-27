import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
import Home from './Home';
import Register from './Register'
import Login from './Login'
import Logout from './Logout'
import NewQuestion from './NewQuestion'
import ViewQuestion from './ViewQuestion'
import DeleteQuestion from './DeleteQuestion'
import DeleteQuiz from './DeleteQuiz'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    var info = JSON.parse(window.localStorage.getItem('logininfo'));
    console.log(info)

    if(info == null)
    {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/register'}>Register</Link></li>
                  <li><Link to={'/login'}>Login</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/register' component={Register} />
                 <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </Router>
      </div>
      );
    }
    else if(info.privilege === 1)
    {
     return (
          <div>
            <Router>
              <div>
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <Link className="navbar-brand" to={'/'}>React App</Link>
                    </div>
                    <ul className="nav navbar-nav">
                      <li><Link to={'/'}>Home</Link></li>
                      <li><Link to={'/ViewPeople'}>View People</Link></li>
                      <li><Link to={'/Dashboard'}>Dashboard</Link></li>
                      <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                      <li><Link to={'/logout'}>Logout</Link></li>
                    </ul>
                  </div>
                </nav>
                <Switch>
                     <Route exact path='/' component={Home} />
                     <Route exact path='/ViewPeople' component={ViewPeople} />
                     <Route exact path='/Dashboard' component={Dashboard} />
                     <Route exact path='/Leaderboard' component={Leaderboard} />                     
                     <Route exact path='/logout' component={Logout} />
                </Switch>
              </div>
            </Router>
          </div>
          );
      }
    else if(info.privilege === 2)
    {
     return (
          <div>
            <Router>
              <div>
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <Link className="navbar-brand" to={'/'}>React App</Link>
                    </div>
                    <ul className="nav navbar-nav">
                      <li><Link to={'/'}>Home</Link></li>
                      <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                      <li><Link to={'/ViewPeople'}>View People</Link></li>
                      <li><Link to={'/NewQuestion'}>New Question</Link></li>
                      <li><Link to={'/ViewQuestion'}>View Questions</Link></li>
                      <li><Link to={'/DeleteQuestion'}>Delete Questions</Link></li>
                      <li><Link to={'/DeleteQuiz'}>Delete Quiz</Link></li>                      
                      <li><Link to={'/logout'}>Logout</Link></li>
                    </ul>
                  </div>
                </nav>
                <Switch>
                     <Route exact path='/' component={Home} />
                     <Route exact path='/DeletePerson' component={DeletePerson} />
                     <Route exact path='/ViewPeople' component={ViewPeople} />
                     <Route exact path='/NewQuestion' component={NewQuestion} />
                     <Route exact path='/ViewQuestion' component={ViewQuestion} />
                     <Route exact path='/DeleteQuestion' component={DeleteQuestion} />
                     <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                     <Route exact path='/logout' component={Logout} />
                </Switch>
              </div>
            </Router>
          </div>
          );
      }
  }
}
export default App;
