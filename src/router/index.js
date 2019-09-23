import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import index from '../views/index'

const Routers = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={index}/>
        </Switch>
    </Router>
);

export default Routers