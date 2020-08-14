import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// Hooks
import { useAuth } from '../hooks/auth.hook'
import { AuthContext } from '../context/authContext'
// Routes
import { useRoutes } from '../routes'
// MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useStyles } from '../style/useStyles'
// Components



export const App = () => {
    const classes = useStyles()
    const { login, token, username } = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    return (
        <AuthContext.Provider
            value={{ username, token, login }}
        >
            <Router>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>

                        { routes }

                    </div>
                    <Box mt={5}>
                        <Typography variant="body2" color="textSecondary" align="center">
                            {'Copyright © '}
                            <Link color="inherit" href="https://github.com/wewilldieinspace">
                                ¯\_(ツ)_/¯
                            </Link>{' '}
                        </Typography>
                    </Box>
                </Container>
            </Router>
        </AuthContext.Provider>
    )
}