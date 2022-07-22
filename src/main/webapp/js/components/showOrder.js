import navigation from "../navigation.js";
const showOrder =

    `<div id="show">
        <h1>Show Order</h1>
        <table  id="tableShow">
            <tr class="tableShow">
                <th>Date</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Back</th>
            </tr>
        </table>
    </div>` ;

let orderList = [
        {
            type: "cheese",
            date: "15-02-2022",
            quantity: 3,
            back: 2

        },
        {
            type: "egg",
            date: "15-02-2022",
            quantity: 3,
            back: 3

        },
        {
            type: "milk",
            date: "18-02-2022",
            quantity: 3,
            back: 0

        },

        {
            type: "milk",
            date: "19-02-2022",
            quantity: 3,
            back: 0

        },

        {
            type: "milk",
            date: "20-02-2022",
            quantity: 3,
            back: 0

        },
        {
            type: "milk",
            date: "21-02-2022",
            quantity: 3,
            back: 0

        }

]

function addOrder (order) {
    return $('<tr>').addClass("showOrder").html(`
       <td>${order.date}</td>
       <td>${order.type}</td>
       <td>${order.quantity}</td>
       <td>${order.back}</td>
    `);
}

let $showTemplate = $(showOrder);



export default {

    render: function () {
        // navigation.showNav(true);
        // navigation.showAside(true);
        orderList.forEach(element => $('#tableShow', $showTemplate).append(addOrder(element)));
        let $main = $('main');
        $main.empty().append($showTemplate);
    }
}