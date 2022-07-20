import bind from "../bind.js";
import navigation from "../navigation.js";

const editTemplate =

    `<div id="edit">
        <h1>Edit Order</h1>
        <table id="tableEdit">
            <tr className="tableEdit">
                <th>Day</th>
                <th>Date</th>
                <th>Type</th>
                <th>Quantity</th>
            </tr>
        </table>
    </div>`;

let $editTemplate = $(editTemplate);

let list = [
    {
        day: "Friday",
        date: "22-10-2022",
        type: "Milk",
        quantity: 5
    },
    {
        day: "Wednesday",
        date: "27-10-2022",
        type: "Cheese",
        quantity: 2
    },
    {
        day: "Friday",
        date: "02-11-2022",
        type: "Milk",
        quantity: 5
    },
    {
        day: "Wednesday",
        date: "07-11-2022",
        type:  "Milk",
        quantity: 3
    },
    {
        day: "Friday",
        date: "09-11-2022",
        type: "Milk",
        quantity: 1
    },
    {
        day: "Friday",
        date: "09-11-2022",
        type: "Cheese",
        quantity: 1
    },
    {
        day: "Friday",
        date: "09-11-2022",
        type: "Egg",
        quantity: 6
    },
    {
        day: "Wednesday",
        date: "21-11-2022",
        type: "Milk",
        quantity: 5
    },
    {
        day: "Friday",
        date: "23-11-2022",
        type: "Milk",
        quantity: 1
    }
];

function make(component) {
    let makeTemplate =
        $('<tr>').addClass("EditComponent").html(`
        <td>${component.day}</td>
        <td>${component.date}</td>
        <td>${component.type}</td>
        <td >
             <input data-field="${component.date} + ${component.type}" type="number" value="${component.quantity}" min="0">
        </td>
    
     `);
    // bind.bind(component, $('#make'));

    return makeTemplate;
}

function addButton(message) {
    return $("<button id='"+ message +"' type='submit' class='primary'>"+ message +"</button>");
}

let i = 0;
export default {
    render: function () {
        navigation.showNav(true);
        if (i === 0) {
            list.forEach(element => $('#tableEdit', $editTemplate).append(make(element)));
            bind.bind(list, $('#tableEdit'));
            $editTemplate.append(addButton("send"));
        }

        i = 1;
        let $main = $('main');
        $main.empty().append($editTemplate);
    }

}