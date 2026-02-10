
const   DEFAULT_BASE_URL = 'http://localhost:3000';
const   BASE_URL = (import.meta.env?.VIT_API_URL ?? DEFAULT_BASE_URL);

export  const   fetchAPI = async (endPoint, {method = 'GET', body, token} = {}) => {

    const   options = {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json',
            ...(token && {Authorization: `Bearer ${token}`})
        }
    }
    console.log("URL", BASE_URL);
    const response = await fetch(`${BASE_URL}${endPoint}`, options)

    const   data = await response.json();

    if(!response.ok){
        throw new Error(data.error || 'Request Failled'); 
    }
    return data;
}