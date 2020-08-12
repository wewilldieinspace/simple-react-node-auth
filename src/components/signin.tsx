import * as React from 'react'
// MaterialUI
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useStyles } from '../style/useStyles'


export const signin = () => {
    const classes = useStyles()

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
                        />
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                </Grid>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                >
                    Sign In
                </Button>
            </form>
        </>
    )
}