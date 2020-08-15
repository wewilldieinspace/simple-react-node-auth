import * as React from 'react'
import { Link } from 'react-router-dom'
// Hooks
import { useHistory } from 'react-router-dom'
// MaterialUI
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import { AuthContext } from '../context/authContext'


export const main = () => {
    const { logout } = React.useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = () => {
        logout()
        history.push('/')
    }

    return (
        <Alert severity='success'>
            <AlertTitle>Success</AlertTitle>
            All done! I proud of you! —
            <Link
                to='/'
                onClick={logoutHandler}
            >Log Out</Link>
        </Alert>
    )
}