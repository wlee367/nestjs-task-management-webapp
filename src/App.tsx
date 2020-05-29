import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './app/components/Authentication/Login';
import { Register } from './app/components/Authentication/Register';
import { Tasks } from './app/containers/Tasks/Tasks';
import LandingPage from './app/containers/LandingPage/LandingPage';
import { TasksDetails } from './app/containers/Tasks/TaskDetails';

const NotFoundPage = () => {
    return <div>40404040404</div>;
};

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path={'/'} exact={true} component={LandingPage} />
            <Route path={'/board'} exact={true} component={Tasks} />
            <Route path={'/board/:id'} exact={true} component={TasksDetails} />
            <Route path={'/login'} exact={true} component={Login} />
            <Route path={'/register'} exact={true} component={Register} />
            <Route path="" component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);

export default App;
