/**
 * Store module
 * 
 * Persist data, provide an api to get it
 */

import { jwtDecode } from './jwtmodule.js'

// Data storage object to push in keys as needed
let data = {
    // Login token
    token: null,
    
    // Cache for coordinator list
    coordinators: null,

    // Save details about the user logged in
    user: null,
};

export default {

    // Save token on successful login
    setToken: function (tokenResponse) {
        let token = null;
        if(tokenResponse != null) {
            token = tokenResponse.token;
        }
        data.token = token;
        // Make token persistent       
        if (token == null) {
            localStorage.removeItem("token");
            // If the token is null, the user must be null too
            data.user = null;
        }
        else {
            data.token = localStorage.setItem("token", token);
            // decode token-contained data and save to user object
            data.user = jwtDecode(token);
        }
    },

    // Get token for the user
    getToken: function () {
        if (data.token == null) {
            // Check if a persistent token is available
            let stored_token = localStorage.getItem("token");
            if (stored_token) {
                data.token = stored_token;
                // If a previously saved token is available, read user information
                data.user = jwtDecode(stored_token);
            }
        }
        return data.token;
    },

    // Get details about the user - NO SETTER, this is the JWT tokens job
    getUser: function() {
        return data.user;
    }
}