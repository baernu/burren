import navigation from "../navigation.js";
const showOrder =

    `<div id="show">
        <h1>Show Order</h1>
        <table  id="tableShow">
            <tr class="tableShow">
                <th>Date</th>
                <th>Liter</th>
            </tr>
        </table>
    </div>` ;

let orderList = [
    {
        date: "15-02-2022",
        liter: 2

    },
    {
        date: "16-02-2022",
        liter: 3

    },
    {
        date: "17-02-2022",
        liter: 4

    },
    {
        date: "18-02-2022",
        liter: 5

    },
    {
        date: "19-02-2022",
        liter: 6

    },
    {
        date: "20-02-2022",
        liter: 2

    },
    {
        date: "21-02-2022",
        liter: 3

    }
]

function show (order) {
    return $('<tr>').addClass("showOrder").html(`
       <td>${order.date}</td>
       <td>${order.liter}</td>
    `);
}

let $showTemplate = $(showOrder);



export default {

    render: function () {
        navigation.showNav(true);
        orderList.forEach(element => $('#tableShow', $showTemplate).append(show(element)));
        let $main = $('main');
        $main.empty().append($showTemplate);
    }
}