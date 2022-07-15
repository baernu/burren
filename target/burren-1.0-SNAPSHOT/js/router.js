/**
 * Router module
 * 
 * Register components
 * Draw components onto site on hash change event
 */

import status from './status.js';

// Object to save routes to on registration
let routes = {};

export default {
    
    // Register route based on a path to make it available for navigation
    register: function (path, component) {
        console.log(`Register path ${path}`);
        routes[path] = component;
    },

    // Render a component on navigation to its path
    navigate: function (path) {
        if (location.hash === '#' + path)
            navigateTo(path);
        else location.hash = path;
    },

    //search the url from google maps
    map: function (path) {
        console.log(`Navigate to ${path}`);
        window.open(path);
        // window.location = path;
    }
}

// Register event listener on hash change event on router creation
$(window).on('hashchange', event => {
    // Get hash, cut-off preceding '#'
    let path = location.hash.replace('#', '');
    // Call navigation function
    navigateTo(path);
});

// Split path and parameters, find component and call its render method
function navigateTo(path) {
    console.log(`Navigate to ${path}`);
    if (path.includes("google.com"))
        window.open(path,"_blank", "top=100, left=100, width=800, height=500, scrollbars=yes, resizable=yes");
    // Split-off path part of hash string
    let i = path.lastIndexOf('/');
    // Split parameters into single strings
    let param = i > 0 ? path.substr(i + 1) : null;
    path = i > 0 ? path.substr(0, i) : path;
    // Find component to render
    let component = routes[path];
    if (component)
        // Draw component onto site
        show(component, param);
    else {
        // Render error message if no matching component found
        $("h2").html("Error");
        $('main').empty();
        status.info(`Path ${path} not found`);
    }
}

// Draw chosen component onto site
function show(component, param) {
    // Clear status container
    status.clear();
    // Adjust title
    document.title = `Burren - ${component.title}`;
    // Grab the container to draw view onto
    // let $container = $('main').empty();
    // Render the component: no return value because of callback hell
    component.render(param);
}
