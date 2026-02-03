import {fetchAPI} from './fetchApi.js';


export  const   usersApi = () => {
    return fetchAPI('/api/users', {
        method: 'GET',
        body: undefined,
        token: localStorage.getItem('token')
    });
}

export  const   loginApi = (credentils) => {   
    return fetchAPI('/api/auth/login', {
        method: 'POST',
        body: credentils
    });
}


export  const   registerApi = (credentils) => {
    return fetchAPI('/api/auth/register', {
        method: 'POST',
        body: credentils
    });
}