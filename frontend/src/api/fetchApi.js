
const   BASE_URL = 'http://localhost:3000';

export  const   fetchAPI = async (endPoint, {method = 'GET', body, token} = {}) => {

    const   options = {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json',
            ...(token && {Authorization: `Bearer ${token}`})
        }
    }
    const response = await fetch(`${BASE_URL}${endPoint}`, options)

    const   data = await response.json();

    if(!response.ok){
        throw new Error(data.error || 'Request Failled'); 
    }
    return data;
}