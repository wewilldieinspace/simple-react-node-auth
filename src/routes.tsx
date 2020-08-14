import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
// Components
import { signin } from './components/signin'
import { signup } from './components/signup'


export const useRoutes = (isAuth: boolean) => {
    if (isAuth) {
        return (
            <Switch>

            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path='/' component={signup} />
                <Route exact path='/login' component={signin} />
            </Switch>
        )
    }
}