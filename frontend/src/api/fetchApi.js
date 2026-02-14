
const   DEFAULT_BASE_URL = 'http://localhost:3000';
export const   BASE_URL = (import.meta.env?.VIT_API_URL ?? DEFAULT_BASE_URL);

export  const   fetchAPI = async (endPoint, {method = 'GET', body, token} = {}) => {

    const   options = {
        method: method,
        headers: {}
    }
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        if (body instanceof FormData) {
        // in upload image i don't set content-type, browser detect it and set it
            options.body = body;
        } else {
        // JSON: Set Content-Type and stringify
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
    }

    console.log("OPTIONSSSS:", options);
    const response = await fetch(`${BASE_URL}${endPoint}`, options)

    const   data = await response.json();

    if(!response.ok){
        throw new Error(data.error || 'Request Failled'); 
    }
    return data;
}