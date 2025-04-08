export default function authHeader(contentType = 'application/json') {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.token) {
        return { 
            'Content-Type': contentType,
            'Authorization': 'Bearer ' + user.token 
        };
    } else {
        return { 'Content-Type': contentType };
    }
}