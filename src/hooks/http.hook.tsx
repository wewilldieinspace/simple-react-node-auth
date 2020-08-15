import { useState, useCallback } from 'react'


export const useHttp = () => {
    const [error, setError] = useState(false)

    const request = useCallback(async (url, body, method = 'POST', headers = {}) => {
        try {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'

            console.log('request sended')


            const res = await fetch(url, {method, body, headers})
            const data = await res.json()

            if(!res.ok) {
                throw new Error(data.message || 'Something went wrong :(((')
            }
            return data
        } catch (e) {
            setError(e.message)
        }

    }, [])

    return { request, error }
}