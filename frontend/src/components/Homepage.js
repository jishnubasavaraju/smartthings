import React, {Component} from "react";
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Capbs from "./Capbs";
import CapDetail from "./CapDetail";
import Create from './Create'

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Router>
            <Switch>
                <Route exact path="/" ><h1>This is Homepage</h1></Route>
                <Route exact path="/create" component={Create} ></Route>
                <Route exact path="/capbs" component={Capbs} ></Route>
                <Route path="/detail/:capbid" component={CapDetail} ></Route>
            </Switch>
        </Router>);
    }
}