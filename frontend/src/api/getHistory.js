import { fetchAPI } from "./fetchApi.js";

export const    getHistory = (otherUid) => {

    // console.log('uid:', otherUid);
    return fetchAPI(
        `/api/messages/${otherUid}`, {
            method: 'GET',
            body: undefined,
            token: localStorage.getItem('token')
        }
    );
}   
