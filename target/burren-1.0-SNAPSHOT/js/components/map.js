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
        listNumber: 1,
        origin: "Illiswilstrasse+11+3033",
        destination: "Murzelenstrasse+24",
        travelmode: "driving",
        name: "Bernhard Messerli 1",
        phone: "079 206 42 23",
        status: "open",
        back: 0
    },
    {
        listNumber: 2,
        origin: "Illiswilstrasse+24+3033",
        destination: "Murzelenstrasse+35",
        travelmode: "bicycling",
        name: "Bernhard Messerli 2",
        phone: "079 206 42 23",
        status: "open",
        back: 0
    },
    {
        listNumber: 3,
        origin: "Bielstrasse+28+3033+Lyss",
        destination: "Murzelenstrasse+35",
        travelmode: "bicycling",
        name: "Bernhard Messerli 3",
        phone: "079 206 42 23",
        status: "open",
        back: 0
    },
    {
        listNumber: 4,
        origin: "Bielstrasse+28+3033+Lyss",
        destination: "Murzelenstrasse+35",
        travelmode: "bicycling",
        name: "Kurt Moser",
        phone: "079 206 42 23",
        status: "open",
        back: 0
    }
];
let actualPosition = "Illiswilstrasse+11";
let actualClient;


let n = 0;
function getNextClient () {
    actualClient = list[n];
    return list[n++];
}
function getPreviousClient () {
    let k = n;
    actualClient = list[--k];
    return list[--n];
}

function searchClient (name) {
    let client = list.find(x => x.name === name);
    actualClient = client;
    return client;
}
function setStatusActualClient(status, name) {
    searchClient(name).status = status;
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
    },
    setNumberBack: function (number) {
        searchClient(this.getActualName()).back = number;
    },
    getNumberBack: function() {
        return searchClient(this.getActualName()).back;
    },
    getActualName: function() {
        return actualClient.name;
    }

}

function addClient(client) {
    return $('<tr>').addClass('clientRow').html(`
        <td>${client.listNumber}</td>
        <td>${client.name}</td>
        <td>${client.origin}</td>
        <td>${client.phone}</td>
        <td id="status" class="done">${client.status}</td>
    `
    );
}
let $temp;
function addButtonDone() {
    $temp =
     $('<div>').addClass('primary').html(
        `
         <form>
            <button id="done" type="submit" class="primary" >done</button>
            <button id="open" type="submit" class="primary" >open</button>
         </form>
        `);

    return $temp;


}


function addClientTemplate(client, $template) {
    let $orderComponent = mapping.getOrderComponent();
    mapping.setOrderComponent($('#table',$orderComponent).append(addClient(client).append(addButtonDone())).append($template));
    $('#done', $temp).click(event => done(event, client.name));
    $('#open', $temp).click(event => open(event, client.name));
}

function done(event, name) {
    event.preventDefault();
    setStatusActualClient("done", name);
    $('#status', mapping.getOrderComponent()).html("done");
    // addClientTemplate(getActualClient(), mapping.getOrderComponent());

}

function open(event, name) {
    event.preventDefault();
    setStatusActualClient("open", name);
    $('#status', mapping.getOrderComponent()).html("open");
}