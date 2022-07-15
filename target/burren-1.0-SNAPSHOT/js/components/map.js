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
    }
];
let actualPosition = "Illiswilstrasse+11";

let client = {};
client.home = "Illiswilstrasse+11";
client.carpoint = "ILliswilstrasse+18";
client.name = "Bernhard Messerli";
client.phone = "079 206 42 23";
client.order = {
    type: "milk",
    number: 2,
    date: "15-10-2022"
};
client.status = "open";
client.comment = "none";


let n = 0;
function getNextClient () {

    return list[n++];
}
function getPreviousClient () {
    return list[--n];
}

function searchClient (name) {
    return client;
}

export default {

    nextMap: function ($template) {
        let clientActual = getNextClient();
        addClientTemplate(clientActual, $template);
        let path = getNextRoute(clientActual.origin, clientActual.destination, clientActual.travelmode);
        // let path = getNextRoute(actualPosition, this.searchClient("Bernhard Messerli").home, "driving");
        router.map(path);
    },
    next: function ($template) {
        let clientActual = getNextClient();
        addClientTemplate(clientActual, $template);
    },
    previous: function () {

    },
    previousMap: function () {

    }

}

function addClient(client) {
    return $('<tr>').addClass('clientRow').html(`
        <td>${client.name}</td>
        <td>${client.origin}</td>
        <td>${client.phone}</td>
        <td>${client.status}</td>
    `
    );
}

function addClientTemplate(client, $template) {
    let $orderComponent = mapping.getOrderComponent();
    // $('#clientrow', $orderComponent).remove();
    mapping.setOrderComponent($('#table',$orderComponent).append(addClient(client)).append($template));
}