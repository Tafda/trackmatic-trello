import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route />{/*TODO add actual componet and route*/}
                <Route render={ () => <Redirect to="/"/> }/>
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;