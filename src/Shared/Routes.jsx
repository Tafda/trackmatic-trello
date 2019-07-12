import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Home from '../Components/Home/Home';
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}  />
                <Route render={ () => <Redirect to="/"/> }/>
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;