import bind from "../bind.js";
import navigation from "../navigation.js";

const editTemplate =

    `<div id="edit">
        <h1>Edit Order</h1>
        <table id="tableEdit">
            <tr className="tableEdit">
                <th>Day</th>
                <th>Date</th>
                <th>Liter</th>
            </tr>
        </table>
    </div>`;

let $editTemplate = $(editTemplate);

let list = [
    {
        day: "Friday",
        date: "22-10-2022",
        liter: 5
    },
    {
        day: "Wednesday",
        date: "27-10-2022",
        liter: 2
    },
    {
        day: "Friday",
        date: "02-11-2022",
        liter: 5
    },
    {
        day: "Wednesday",
        date: "07-11-2022",
        liter: 3
    },
    {
        day: "Friday",
        date: "09-11-2022",
        liter: 1
    },
    {
        day: "Wednesday",
        date: "14-11-2022",
        liter: 3
    },
    {
        day: "Friday",
        date: "16-11-2022",
        liter: 1
    },
    {
        day: "Wednesday",
        date: "21-11-2022",
        liter: 5
    },
    {
        day: "Friday",
        date: "23-11-2022",
        liter: 1
    }
];

function make(component) {
    let makeTemplate =
        $('<tr>').addClass("EditComponent").html(`
        <td>${component.day}</td>
        <td>${component.date}</td>
        <td >
             <input data-field="${component.date}" type="number" value="${component.liter}" min="0">
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