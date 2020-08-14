import { createContext } from 'react'
import { AuthContextI } from '../types'

export const AuthContext = createContext<AuthContextI>({
    username: null,
    token: null,
    login: () => {},
})