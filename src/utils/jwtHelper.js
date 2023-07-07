export function decodeToken(token) {
    const payload = token.split('.')[1];
    const decodedPayload = decodeURIComponent(atob(payload).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(decodedPayload);
}