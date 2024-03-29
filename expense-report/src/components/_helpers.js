export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}

//Auth header is a helper function that returns an HTTP Authorization header containing the basic authentication credentials 
//(base64 username and password) of the currently logged in user from local storage. 
//If the user isn't logged in an empty object is returned.

//The auth header is used to make authenticated HTTP requests to the server api using basic authentication.

