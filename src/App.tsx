import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './app/components/Authentication/Login';
import { Register } from './app/components/Authentication/Register';
import { Tasks } from './app/containers/Tasks/Tasks';
import LandingPage from './app/containers/LandingPage/LandingPage';
import { TasksDetails } from './app/containers/Tasks/TaskDetails';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path={'/'} exact={true} render={() => <LandingPage />} />
            <Route path={'/board'} exact={true} render={() => <Tasks />} />
            <Route
                path={'/board/:id'}
                exact={true}
                render={() => <TasksDetails />}
            />
            <Route path={'/login'} exact={true} render={() => <Login />} />
            <Route
                path={'/register'}
                exact={true}
                render={() => <Register />}
            />
            <Route
                path=""
                render={() => {
                    return <div>404</div>;
                }}
            />
        </Switch>
    </BrowserRouter>
);

export default App;
