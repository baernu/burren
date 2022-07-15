import map from "./map.js";
const template = `
    <div >
        <table  id="table">
            <tr class="tableOrder">
                <th id="th1">Name</th>
                <th id="th2">Addresse</th>
                <th id="th3">Number</th>
                <th id="th4">Status</th>
            </tr>
        </table>
     </div>
     `;
const template2 = ` 
        <div>
        <br>
        <br>
        <br>
        <form id="search">
        <button id="nextMap" type="submit" class="primary">NextMap</button>
        <button id="previousMap" type="submit" class="primary">PreviousMap</button> <br>
        <button id="next" type="submit" class="primary">Next</button>
        <button id="previous" type="submit" class="primary">Previous</button>
        <br>
        <br>
        <label for="username">Name</label> 
	    <input id="username" name="username">
        <button id="search" type="submit" class="primary">Search</button>
        </form>
    </div>

`;

let $template = $(template);
let $template2 = $(template2);

export default {

    render: function () {
        $('#nextMap', $template2).click(event => this.nextMap(event, $template2));
        $('#next', $template2).click(event => this.next(event, $template2));
        let $main = $('main').empty();
        $main.append($template).append($template2);
    },

    getOrderComponent: function() {
        return $(template);
        },

    setOrderComponent: function(orderComponent) {
        $template = orderComponent;
        this.render();
        },
    nextMap: function (event, $template) {
        event.preventDefault();
        map.nextMap($template);

    },
    next: function (event, $template) {
        event.preventDefault();
        map.next($template);
    },
    previous: function (event) {
        event.preventDefault();
    }
}