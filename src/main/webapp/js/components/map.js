import router from "../router.js";
import mapping from "./mapping.js";


function getNextRoute(origin, destination, travelmode) {
    // let path = service.getNextRoute();
    // let path = "https://www.google.com/maps/dir/?api=1&origin=Illiswilstrasse&destination=Uettligenstrasse&travelmode=bicycling"
    let path = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + destination + "&travelmode=" + travelmode;
    return path;
}
let list = [
    {
        origin: "Illiswilstrasse+11+3033",
        destination: "Murzelenstrasse+24",
        travelmode: "driving",
        name: "Bernhard Messerli",
        phone: "079 206 42 23",
        status: "open"
    },
    {
        origin: "Illiswilstrasse+24+3033",
        destination: "Murzelenstrasse+35",
        travelmode: "bicycling",
        name: "Bernhard Messerli",
        phone: "079 206 42 23",
        status: "open"
    },
    {
        origin: "Bielstrasse+28+3033+Lyss",
        destination: "Murzelenstrasse+35",
        travelmode: "bicycling",
        name: "Bernhard Messerli",
        phone: "079 206 42 23",
        status: "open"
    },
    {
        origin: "Bielstrasse+28+3033+Lyss",
        destination: "Murzelenstrasse+35",
        travelmode: "bicycling",
        name: "Kurt Moser",
        phone: "079 206 42 23",
        status: "open"
    }
];
let actualPosition = "Illiswilstrasse+11";


let n = 0;
function getNextClient () {

    return list[n++];
}
function getPreviousClient () {
    return list[--n];
}

function searchClient (name) {
    return list.find(x => x.name === name);
}
function setStatusActualClient(status) {
    list[n].status = status;
}
function getActualClient() {
    return list[n];
}

export default {

    nextMap: function ($template) {
        let clientActual = getNextClient();
        addClientTemplate(clientActual, $template);
        let path = getNextRoute(actualPosition, clientActual.destination, clientActual.travelmode);
        // let path = getNextRoute(actualPosition, this.searchClient("Bernhard Messerli").home, "driving");
        actualPosition = clientActual.destination;
        router.map(path);
    },
    next: function ($template) {
        let clientActual = getNextClient();
        addClientTemplate(clientActual, $template);
    },
    previous: function ($template) {
        let clientActual = getPreviousClient();
        addClientTemplate(clientActual, $template);
    },
    previousMap: function ($template) {
        let clientActual = getPreviousClient();
        addClientTemplate(clientActual, $template);
        let path = getNextRoute(actualPosition, clientActual.destination, clientActual.travelmode);
        // let path = getNextRoute(actualPosition, this.searchClient("Bernhard Messerli").home, "driving");
        actualPosition = clientActual.destination;
        router.map(path);
    },
    search: function ($template, name) {
        let clientActual = searchClient(name);
        addClientTemplate(clientActual, $template);
    }

}

function addClient(client) {
    return $('<tr>').addClass('clientRow').html(`
        <td>${client.name}</td>
        <td>${client.origin}</td>
        <td>${client.phone}</td>
        <td id="status" class="done">${client.status}</td>
    `
    );
}
function addButtonDone() {
    let temp =
     $('<div>').addClass('primary').html(
        `
         <form>
            <button id="done" type="submit" class="primary" >done</button>
            <button id="open" type="submit" class="primary" >open</button>
         </form>
        `);

    return temp;


}


function addClientTemplate(client, $template) {
    let $orderComponent = mapping.getOrderComponent();
    // $('#clientrow', $orderComponent).remove();
    mapping.setOrderComponent($('#table',$orderComponent).append(addClient(client).append(addButtonDone())).append($template));
    // $('#done', $orderComponent).click(event => done(event));
}

function done(event) {
    event.preventDefault();
    setStatusActualClient("done");
    $('#status', mapping.getOrderComponent()).html("done");
    addClientTemplate(getActualClient(), mapping.getOrderComponent());
}