import * as React from 'react'
// Hooks
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
// MaterialUI
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { useStyles } from '../style/useStyles'
import { AuthContext } from '../context/authContext'



export const signin = () => {
    const classes = useStyles()
    const history = useHistory()
    const { request, error } = useHttp()
    const { login } = React.useContext(AuthContext)
    const [user, setUser] = React.useState({
        username: '', password: ''
    })

    const loginHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault()
            const data = await request('http://localhost:8000/api/auth/login', { ...user })
            await login(data.username, data.token)
            history.push('/main')
        } catch (e) {}
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Typography component='h1' variant='h5'>
                Sign in
            </Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id='username'
                            label='Username'
                            name='username'
                            autoComplete='username'
                            value={user.username}
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            value={user.password}
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        { error && (
                            <Alert severity='error'>{error}</Alert>
                        ) }
                    </Grid>
                </Grid>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    onClick={loginHandler}
                >
                    Sign In
                </Button>
            </form>
        </>
    )
}