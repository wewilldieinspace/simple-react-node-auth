import { useState, useEffect, useCallback } from 'react'


export const useAuth = () => {
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    const login = useCallback((username, token) => {
        setUsername(username)
        setToken(token)

        localStorage.setItem('user', JSON.stringify({
            username, token
        }))
    }, [])

    useEffect(() => {
        const storage: any = localStorage.getItem('user')
        const userData = JSON.parse(storage)

        if (userData || userData?.username) {
            login(userData.username, userData.token)
        }

    }, [login])

    return { login, token, username }
}