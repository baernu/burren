/**
 * Service Module
 * 
 * Providing all functionality connecting to the REST API
 * Every exported function returns a promise of a request made to the api
 */


import status from "./status.js";

// Base URI of the api
const BASE_URI = "/api";

// Write notification to console
function debugLog(req) {
    console.log(`Sending ${req.type} request to ${req.url}`);
}

export default {

    /**
     * Login/Logout endpoints
     */

    // Get JWT token with username and password
    getToken: function(email, password) {
        let req = {
            url: BASE_URI + '/login',
            type: 'GET',
            contentType: 'application/json',
            headers: {
                Authorization: 'Basic ' + btoa(email + ':' + password)
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    /**
     * CRUD modules endpoints
     */

    // Get a list of all modules
    getModules: function(token) {
        let req = {
            url: BASE_URI + '/modules',
            type: 'GET',
            contentType: 'application/json',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Get details of one specific module
    getModule: function(token, moduleID) {
        let req = {
            url: BASE_URI + '/modules/' + moduleID,
            type: 'GET',
            contentType: 'application/json',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Create a new module
    postModule: function(token, module) {
        if(module.moduleID != null) {
            throw "ID'ed Modules must be sent in a put request";
        }
        let req = {
            url: BASE_URI + '/modules',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(module),
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Update an existing module
    putModule: function(token, module) {
        if (module.moduleID == null) {
            throw "New modules without an ID must be sent in a post request";
        }
        let req = {
            url: BASE_URI + '/modules/' + module.moduleID,
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(module),
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Delete an existing module
    delModule: function(token, moduleID) {
        if (moduleID == null) {
            throw "New modules without an ID can not be deleted";
        }
        let req = {
            url: BASE_URI + '/modules/' + moduleID,
            type: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Edit the description of an existing module
    patchModule: function(token, moduleID, description) {
        if(module.moduleID == null) {
            throw "Only existing modules with an ID can be patched";
        }
        let req = {
            url: BASE_URI + '/modules/' + moduleID,
            type: 'PATCH',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({"description": description}),
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    /**
     * CRUD run endpoints
     */

    // Get a list of all module runs ever, we filter later
    getRuns: function (token) {
        let req = {
            url: BASE_URI + '/run',
            type: 'GET',
            contentType: 'application/json',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Get details about one specific module run
    getRun: function (token, moduleRunID) {
        let req = {
            url: BASE_URI + '/run/' + moduleRunID,
            type: 'GET',
            contentType: 'application/json',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Create a new module run
    postRun: function (token, moduleRun) {
        if (moduleRun.moduleRunID != null) {
            throw "ID'ed runs must be sent in a put request";
        }
        let req = {
            url: BASE_URI + '/run',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(moduleRun),
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Update an existing module run
    putRun: function (token, moduleRun) {
        if (moduleRun.moduleRunID == null) {
            throw "New runs without an ID must be sent in a post request";
        }
        let req = {
            url: BASE_URI + '/run/' + moduleRun.moduleRunID,
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(moduleRun),
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Delete an existing module run
    delRun: function (token, moduleRunID) {
        let req = {
            url: BASE_URI + '/run/' + moduleRunID,
            type: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    /**
     * CRUD Enrollment endpoints
     */

    // Get a list of all enrolled students in a module run
    getEnroll: function (token, moduleRunID) {
        let req = {
            url: BASE_URI + '/enrollment/' + moduleRunID,
            type: 'GET',
            contentType: 'application/json',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Enroll yourself into a module run
    putEnroll: function (token, moduleRunID) {
        let req = {
            // Might be a put request but actually does not need a body
            url: BASE_URI + '/enrollment/' + moduleRunID,
            type: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    // Cancel your enrollment to a module run
    delEnroll: function (token, moduleRunID) {
        let req = {
            url: BASE_URI + '/enrollment/' + moduleRunID,
            type: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    /**
     * Set grade endpoint
     */

    // Set a grade for a student/module run
    putGrade: function(token, moduleRunID, userID, grade) {
        let req = {
            url: BASE_URI + '/grade/' + moduleRunID + "/" + userID,
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(grade),
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    /**
     * Get people endpoints
     */

    // Get a list of all coordinators
    getTeachers: function(token) {
        let req = {
            url: BASE_URI + '/teachers/',
            type: 'GET',
            contentType: 'application/json',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        debugLog(req);
        return $.ajax(req);
    },

    /**
     * Handle typical errors of an API call
     */
    handleError: function (xhr) {
        // Delete token if it is invalid
        if(xhr.status && (xhr.status == 401 || xhr.status == 403)) {
            navigation.logout();
        }
        else if(xhr.status && xhr.status == 404) {
            status.error("Matching data not found")
        }
        // Display an unexpected error
        else {
            console.log(xhr);
            status.error(`Unexpected error (${xhr.status})`);
        }
    }
}
