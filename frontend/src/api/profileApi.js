import  { fetchAPI }    from    './fetchApi.js';

export  const   profileApi = () => {
    return fetchAPI("/api/users/me", {
        method: 'GET',
        body: undefined,
        token: localStorage.getItem('token')
    });
}


export  const   avatarApi = (option) => {
    return fetchAPI('/api/profile/avatar',{
        method: option.method,
        body: option.body,
        token: localStorage.getItem('token')
    
    });
}

export  const   userApi = () => {
    return fetchAPI('/api/users/me', {
        method: 'GET',
        body: undefined,
        token: localStorage.getItem('token')
    });
}

export  const   infoApi = (info) => {
    return fetchAPI('/api/profile/info', {
        method: 'POST',
        body: info,
        token: localStorage.getItem('token')
    });
}