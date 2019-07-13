import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Home from '../Components/Home/Home';
import Board from '../Components/Board/Board';
import NavBar from '../Components/NavBar/NavBar';

const Routes = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/board/:index" exact component={Board} />
                <Route render={ () => <Redirect to="/"/> }/>
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;