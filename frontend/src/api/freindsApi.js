import { fetchAPI } from "./fetchApi"

export const freindsListAPI = () => {
    return fetchAPI('/api/freinds/', {
        method: 'GET',
        body: undefined,
        token: localStorage.getItem('token')
    });
}

export const sendFriendRequestAPI = (username) => {
    return fetchAPI(`/api/freinds/request/${username}`, {
        method: 'POST',
        body: undefined,
        token: localStorage.getItem('token')
    });
}

export const getPendingRequestsAPI = () => {
    return fetchAPI('/api/freinds/pending', {
        method: 'GET',
        body: undefined,
        token: localStorage.getItem('token')
    });
}

export const acceptFriendRequestAPI = (requestId) => {
    return fetchAPI(`/api/freinds/accept/${requestId}`, {
        method: 'PUT',
        body: undefined,
        token: localStorage.getItem('token')
    });
}

export const rejectFriendRequestAPI = (requestId) => {
    return fetchAPI(`/api/freinds/reject/${requestId}`, {
        method: 'PUT',
        body: undefined,
        token: localStorage.getItem('token')
    });
}