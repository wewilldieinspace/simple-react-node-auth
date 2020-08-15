import { useState, useEffect, useCallback } from 'react'

let storage = 'user'


export const useAuth = () => {
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    const login = useCallback((username, token) => {
        setUsername(username)
        setToken(token)

        localStorage.setItem(storage, JSON.stringify({
            username, token
        }))
    }, [])

    const logout = useCallback(() => {
        setUsername(null)
        setToken(null)
        localStorage.removeItem(storage)
    }, [])

    useEffect(() => {
        const userStorage: any = localStorage.getItem(storage)
        const userData = JSON.parse(userStorage)

        if (userData || userData?.token) {
            login(userData.username, userData.token)
        }

    }, [login])

    return { login, logout, token, username }
}