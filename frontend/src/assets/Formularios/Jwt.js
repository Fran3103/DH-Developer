

export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function deleteToken() {
    localStorage.removeItem('token');
}


