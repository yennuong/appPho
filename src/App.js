import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';

//components
import Home from './components/screens/Home';
//styles
import './styles/reset.css';
import './styles/main.scss';

function App() {
  return (
    <div className="App">
        <h1 className="main-title">Phở Dậu</h1>
         <div className="wrapper">
          <Router>
              <Switch>
                <Route path="/" component={Home} />
              </Switch>
          </Router>
         </div>
     </div>
  );
}

export default App;
