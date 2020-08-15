import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// Components
import { signin } from './components/signin'
import { signup } from './components/signup'
import { main } from './components/main'


export const useRoutes = (isAuth: boolean) => {
    if (!isAuth) {
        return (
            <Switch>
                <Route exact path='/register' component={signup} />
                <Route exact path='/login' component={signin} />
                <Redirect to='/register' />
            </Switch>
        )
    }
        return (
            <Switch>
                <Route exact path='/main' component={main} />
                <Redirect to='/main' />
            </Switch>
        )
}