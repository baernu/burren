import router from "../router.js";
import mapping from "./mapping.js";
import bind from "../bind.js";
import status from "../status.js";


function getNextRoute(origin, destination, travelmode) {

    let path = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + destination + "&travelmode=" + travelmode;
    return path;
}

let list = [
    {
        listNumber: 0,
        origin: "",
        travelmode: "",
        name: "",
        phone: "",
        orders: [
            {
                id: 0,
                type: "",
                quantity: 0,
                back: 0
            }
        ],
        status: 1
    },

    {
        listNumber: 1,
        origin: "Mengestorfbergstrasse",
        travelmode: "driving",
        name: "Thomas Burren",
        phone: "079 206 42 23",
        orders: [
            {
                id: 1,
                type: "",
                quantity: 0,
                back: 0
            }

        ],
        status: 1
    },
    {
        listNumber: 2,
        origin: "Könizstrasse 25",
        travelmode: "driving",
        name: "Fritz Seebacher",
        phone: "079 256 23 23",
        orders:
            [
                {
                    id: 2,
                    type: "Milk",
                    quantity: 3,
                    back: 0
                },
                {
                    id: 3,
                    type: "Cheese",
                    quantity: 3,
                    back: 0
                }
            ],
        status: 0

    },
    {
        listNumber: 3,
        origin: "Illiswilstrasse+24+3033",
        travelmode: "bicycling",
        name: "Bernhard Messerli 2",
        phone: "079 206 42 23",
        orders: [
            {
                id: 4,
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
        name: "Bernhard Messerli 3",
        phone: "079 206 42 23",
        orders: [
            {
                id: 5,
                type: "Milk",
                quantity: 3,
                back: 0
            }
        ],
        status: 0
    },
    {
        listNumber: 5,
        origin: "Bielstrasse+28+3033+Lyss",
        travelmode: "bicycling",
        name: "Kurt Moser",
        phone: "079 206 42 23",
        orders: [
            {
                id: 6,
                type: "Milk",
                quantity: 3,
                back: 0
            }
        ],
        status: 0
    },
    {
        listNumber: 6,
        origin: "Mengestorfbergstrasse",
        travelmode: "driving",
        name: "Thomas Burren",
        phone: "",
        orders: [
            {
                id: 7,
                type: "",
                quantity: 0,
                back: 0
            }
        ],
        status: 1
    },
    {
        listNumber: -5,
        origin: "Mengestorfbergstrasse",
        travelmode: "",
        name: "",
        phone: "",
        orders: [
            {
                id: 8,
                type: "",
                quantity: 0,
                back: 0
            }
        ],
        status: 1
    },
];

let actualPosition;
let actualClient;
let bol = "bad";
let copyList1 = copyList();
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



let n = 0;
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
        if (list[i+1].listNumber !== -5){

            if (list[i].status === 0)
                status.error("last client not delivered!");


            let clientActual = getNextClient();
            addClientTemplate(clientActual, $template);
            addClientOrders(clientActual);
            let position = watchPos();
            if (bol === "bad") {
                let k = n;
                actualPosition = list[--k].origin;
            } else
                actualPosition = position;

            let path = getNextRoute(actualPosition, clientActual.origin, clientActual.travelmode);
            router.map(path);
        }

    },
    next: function ($template2, $template) {
        status.clear();

        let i = n;
        if (list[i+1].listNumber !== -5) {

            if (list[i].status === 0)
                status.error("last client not delivered!");


            let clientActual = getNextClient();
            addClientTemplate(clientActual, $template);
            addClientOrders(clientActual);
        }
    },
    previous: function ($template2, $template) {
        status.clear();
        let clientActual = getPreviousClient();
        addClientTemplate(clientActual, $template);
        addClientOrders(clientActual);
    },
    search: function ($template2, name) {
        status.clear();
        let clientActual = searchClient(name);
        addClientTemplate(clientActual, $template2);
        addClientOrders(clientActual);
    },
    exportCopyList: function () {
        return copyList1;
    },
    exportList: function () {
        return list;
    }
}

function addClient(client) {
   let $data = $('<tr id="trow">').addClass('clientRow').html(`
        <td>${client.listNumber}</td>
        <td>${client.name}</td>
        <td>${client.origin}</td>
        <td>${client.phone}</td>
        <td>
            <input data-field="status" name="status" type="number" value="${client.status}" min="0" max="1">
        </td>
    `
    );
    bind.bind(client, $data);

   return $data;
}
function getOrder(order) {
    let $data = $('<tr id="orderbind">').addClass('clientRow').html(`
        <td>${order.type}</td>
        <td>
            <input data-field="quantity" name="quantity" type="number" value="${order.quantity}" min="0">
        </td>
        <td>
            <input data-field="back" name="back" type="number" value="${order.back}" min="0">
        </td>
    `
    );
    bind.bind(order, $data);

    return $data;
}
function addClientOrders(client) {

    $('#table1', mapping.getOrders()).empty().append($('<tr class="tableOrder"><th id="thType">Type</th><th id="thQuantity">Quantity</th><th id="thBack">Back</th></tr>').html());
    client.orders.forEach(element => $('#table1', mapping.getOrders()).append(getOrder(element)));
}
function addClientTemplate(client, $template) {

    $('#tableOrder',$template).empty().append( $('<tr id="tableOrderRow"><th id="thNumber">Nr</th><th id="thName">Name</th><th id="th2">Address</th><th id="th3">Phone</th><th id="th4">Delivered?</th></tr>').html()).append(addClient(client));
}
function copyList() {
    let list1 = [];
    list.forEach(client => list1.push(client));
    return list1;
}


