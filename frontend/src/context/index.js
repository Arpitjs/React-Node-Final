import { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import { getData } from './../utils/localStorage';

let UserContext = createContext()

let UserProvider = ({ children }) => {

    const [state, setState] = useState({
        user: {}, token: '', refreshToken: ''
    });

    //to set the user and token 
    useEffect(() => {
        // setUser(JSON.parse(localStorage.getItem('auth')))
        setState({ ...getData('user'), token: getData('token'), refreshToken: getData('refreshToken')});
    }, [])

    //for backend
    // set tokens and base url in the context
    let token = state && state.token ? state.token : ''
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    //if token is expired
    axios.interceptors.response.use(response => response, error => {
        let res = error.response
        // console.log('res>>>', res)
        if(res.status === 401 && res.config && !res.config.__isRetryRequest) {
            setState(null)
            localStorage.removeItem('auth')
        }
        return Promise.reject(error)
    })
    return (
        <UserContext.Provider value={[state, setState]}>
            { children }
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }

