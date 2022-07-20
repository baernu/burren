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
        orders:
        [
            {
                type: "Milk",
                quantity: 3,
                back: 0
             },
            {
                type: "Cheese",
                quantity: 3,
                back: 0
            }
            ],
        status: 0

    },
    {
        listNumber: 0,
        origin: "Mengestorfbergstrasse",
        travelmode: "",
        name: "",
        phone: "",
        orders: [
            {
                type: "Milk",
                quantity: 3,
                back: 0
            }
        ],
        status: 0
    },

    {
        listNumber: 1,
        origin: "Illiswilstrasse+13+3033",
        travelmode: "driving",
        name: "Bernhard Messerli 1",
        phone: "079 206 42 23",
        orders: [
            {
                type: "Milk",
                quantity: 3,
                back: 0
            },
            {
                type: "Cheese",
                quantity: 5,
                back: 0
            },
            {
                type: "Egg",
                quantity: 5,
                back: 0
            }
        ],
        status: 0
    },
    {
        listNumber: 2,
        origin: "Illiswilstrasse+24+3033",
        travelmode: "bicycling",
        name: "Bernhard Messerli 2",
        phone: "079 206 42 23",
        orders: [
            {
                type: "Milk",
                quantity: 3,
                back: 0
            }
        ],
        status: 0
    },
    {
        listNumber: 3,
        origin: "Bielstrasse+28+3033+Lyss",
        travelmode: "bicycling",
        name: "Bernhard Messerli 3",
        phone: "079 206 42 23",
        orders: [
            {
                type: "Milk",
                quantity: 3,
                back: 0
            }
        ],
        status: 0
    },
    {
        listNumber: 4,
        origin: "Bielstrasse+28+3033+Lyss",
        travelmode: "bicycling",
        name: "Kurt Moser",
        phone: "079 206 42 23",
        orders: [
            {
                type: "Milk",
                quantity: 3,
                back: 0
            }
        ],
        status: 0
    },
    {
        listNumber: 5,
        origin: "Mengestorfbergstrasse",
        travelmode: "",
        name: "",
        phone: "",
        orders: [
            {
                type: "Milk",
                quantity: 3,
                back: 0
            }
        ],
        status: 0
    },
];

let actualPosition;
let actualClient;
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
            bol = "bad";
        },
        // ⚙️ options object, optional
        {
            timeout: 1000,
        }
    );
}



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

export default {

    nextMap: function ($template2, $template) {
        status.clear();

        bol = "bad";
        let i = n;
        if (i > -1) {
            if (list[i].status === 0)
                status.error("last client not delivered!");
        }

        let clientActual = getNextClient();
        addClientTemplate(clientActual, $template);
        addClientOrders(clientActual);
        let position = watchPos();
        if (bol === "bad") {
            let k = n;
            actualPosition = list[--k].origin;
            console.log(actualPosition);
        } else
            actualPosition = position;

        let path = getNextRoute(actualPosition, clientActual.origin, clientActual.travelmode);
        router.map(path);
    },
    next: function ($template2, $template) {
        status.clear();

        let i = n;
        if (i > -1) {
            if (list[i].status === 0)
                status.error("last client not delivered!");
        }

        let clientActual = getNextClient();
        addClientTemplate(clientActual, $template);
        addClientOrders(clientActual);
    },
    previous: function ($template2, $template) {
        status.clear();
        let clientActual = getPreviousClient();
        addClientTemplate(clientActual, $template);
        addClientOrders(clientActual);
    },
    actualize: function ($template2, $template) {
        status.clear();
        let clientActual = searchClient(this.getActualName());
        addClientTemplate(clientActual, $template);
        addClientOrders(clientActual);
    },
    search: function ($template2, name) {
        status.clear();
        let clientActual = searchClient(name);
        addClientTemplate(clientActual, $template2);
        addClientOrders(clientActual);
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
        <td>
            <input data-field="${client.status}+ ${client.name}" name="${client.status}" type="number" value="${client.status}" min="0" max="1">
        </td>
    `
    );

   return data;

}
let i = 0;
function getOrder(order) {
    let data = $('<tr id="orderbind">').addClass('clientRow').html(`
        <td>${order.type}</td>
        <td>
            <input data-field="${order.quantity}+ i" name="${order.quantity}" type="number" value="${order.quantity}" min="0">
        </td>
        <td>
            <input data-field="${order.back}" name="${order.back}" type="number" value="${order.back}" min="0">
        </td>
    `
    );
    i++;
    
    return data;
}

function addClientOrders(client) {

    client.orders.forEach(element => $('#table1', mapping.getOrders()).append(getOrder(element)));
    bind.bind(client, mapping.getOrders());
}


function addClientTemplate(client, $template) {
    $('#tableOrder',$template).append(addClient(client));

}


