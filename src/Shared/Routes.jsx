import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Home from '../Components/Home/Home';
import Board from '../Components/Board/Board';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/board/:index" exact component={Board} />
                <Route render={ () => <Redirect to="/"/> }/>
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;