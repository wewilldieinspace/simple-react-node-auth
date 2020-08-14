import * as React from 'react'
import { Link } from 'react-router-dom'
// Hooks
import { useHttp } from '../hooks/http.hook'
// MaterialUI
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { useStyles } from '../style/useStyles'



export const signup = () => {
    const classes = useStyles()
    const { request, loading, error, clearError } = useHttp()
    const [user, setUser] = React.useState({
        username: '', email: '', password: ''
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const registerHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault()
            await request(`http://localhost:8000/api/auth/register`, { ...user })
        } catch (e) {

        }
    }

    return (
        <>
            <Typography component='h1' variant='h5'>
                Sign up
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
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
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
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        { error && (
                            <Alert severity="error">{error}</Alert>
                        ) }
                    </Grid>
                </Grid>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    onClick={registerHandler}
                >
                    Sign Up
                </Button>
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Link to='/login'>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}