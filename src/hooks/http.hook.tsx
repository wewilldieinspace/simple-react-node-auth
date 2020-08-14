import { useState, useCallback } from 'react'


export const useHttp = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const request = useCallback(async (url, body, method = 'POST', headers = {}) => {
        setLoading(true)

        try {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'

            console.log('request sended')


            const res = await fetch(url, {method, body, headers})
            const data = await res.json()

            if(!res.ok) {
                console.log('error data: ', data)
                throw new Error(data.message || 'Something went wrong :(((')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
        }

    }, [])


    const clearError = useCallback(() => setError(false), [])

    return { request, loading, error, clearError }
}