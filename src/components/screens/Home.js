import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
//components
import MainDisks from './MainDisks';
import ChooseTable from './ChooseTable';
import PageNotFound from './PageNotFound';
//styles
import '../../styles/screens.scss';
class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home">
                <Switch>
                    <Route path={`/`} exact component={ChooseTable} />
                    <Route path={`/dat-mon/:maban`} exact component={MainDisks} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        )
    }
}

export default Home;