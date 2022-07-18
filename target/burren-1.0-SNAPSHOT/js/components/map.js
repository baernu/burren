import router from "../router.js";
import mapping from "./mapping.js";
import bind from "../bind.js";
import status from "../status.js";


function getNextRoute(origin, destination, travelmode) {
    // let path = service.getNextRoute();
    // let path = "https://www.google.com/maps/dir/?api=1&origin=46.9596448,7.2632538&destination=Uettligenstrasse&travelmode=bicycling"
    let path = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + destination + "&travelmode=" + travelmode;

    return path;
}
let list = [
    {
        listNumber: -1,
        origin: "start",
        destination: "",
        travelmode: "",
        name: "",
        phone: "",
        status: "done",
        back: 0
    },
    {
        listNumber: 0,
        origin: "start",
        destination: "Mengestorfstrasse",
        travelmode: "",
        name: "",
        phone: "",
        status: "done",
        back: 0
    },

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
        destination: "Steiniswegstrasse+35",
        travelmode: "bicycling",
        name: "Bernhard Messerli 2",
        phone: "079 206 42 23",
        status: "open",
        back: 0
    },
    {
        listNumber: 3,
        origin: "Bielstrasse+28+3033+Lyss",
        destination: "Uettligenstrasse+35",
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
    },
    {
        listNumber: 5,
        origin: "end",
        destination: "end",
        travelmode: "driving",
        name: "end",
        phone: "",
        status: "done",
        back: 0
    }
];
// let actualPosition = "Mengestorfbergstrasse";
// let pos = position.pos();
let actualPosition;
let bol = "bad";
actualPosition = "Mengestorfbergstrasse";
function watchPos () {
    navigator.geolocation.watchPosition(
        // ✅   success callback, mandatory
        (position) => {
            actualPosition = position.coords.latitude + "," + position.coords.longitude;
            bol = "good";

        },
        // 🚨 error callback, optional
        (error) => {
            // display error
            console.log(error);
        },
        // ⚙️ options object, optional
        {
            timeout: 1000,
        }
    );
}
watchPos();


console.log(actualPosition);
let actualClient;


let n = 1;
function getNextClient () {
    let k = n;
    actualClient = list[++k];
    return list[++n];
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
        status.clear();
        let i = n;
        if (i > -1) {
            if (list[i].status === "open")
                status.error("last client not delivered!");
        }
        let clientActual = getNextClient();
        addClientTemplate(clientActual, $template);
        let path = getNextRoute(actualPosition, clientActual.origin, clientActual.travelmode);
        // actualPosition = clientActual.origin;
        actualPosition = watchPos();
        router.map(path);
    },
    next: function ($template) {
        status.clear();
        let i = n;
        if (i > -1) {
            if (list[i].status === "open")
                status.error("last client not delivered!");
        }

        let clientActual = getNextClient();
        addClientTemplate(clientActual, $template);
    },
    previous: function ($template) {
        status.clear();
        let clientActual = getPreviousClient();
        addClientTemplate(clientActual, $template);
    },
    previousMap: function ($template) {
        status.clear();
        let clientActual = getPreviousClient();
        addClientTemplate(clientActual, $template);
        let path = getNextRoute(actualPosition, clientActual.destination, clientActual.travelmode);
        // let path = getNextRoute(actualPosition, this.searchClient("Bernhard Messerli").home, "driving");
        actualPosition = clientActual.destination;
        router.map(path);
    },
    actualize: function ($template) {
        status.clear();
        let clientActual = searchClient(this.getActualName());
        addClientTemplate(clientActual, $template);
    },
    search: function ($template, name) {
        status.clear();
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
    },
    exportList: function() {
        return list;
    }

}

function addClient(client) {
   let data = $('<tr id="trow">').addClass('clientRow').html(`
        <td>${client.listNumber}</td>
        <td>${client.name}</td>
        <td>${client.origin}</td>
        <td>${client.phone}</td>
        <td data-field="back" name="back" class="done">${client.back}</td>
        <td data-field="status" name="status" class="done">${client.status}</td>
    `
    );
   bind.bind(client, $('#trow'));
   // bind.bind(client.back, $('#trow'));
   return data;

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


}

function open(event, name) {
    event.preventDefault();
    setStatusActualClient("open", name);
}

