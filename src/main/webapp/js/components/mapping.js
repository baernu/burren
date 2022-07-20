import map from "./map.js";
import status from "../status.js";
import navigation from "../navigation.js";
import bind from "../bind.js";
const template = `
    <div >
        <table  id="tableOrder">
            <tr id="tableOrderRow">
                <th id="thNumber">Nr</th>
                <th id="thName">Name</th>
                <th id="th2">Address</th>
                <th id="th3">Phone</th>
                <th id="th4">Delivered?</th>
            </tr>
        </table>
     </div>
     `;

const template1 =
           ` 
     <div >
        <table  id="table1">
            <tr class="tableOrder">
                <th id="thType">Type</th>
                <th id="thQuantity">Quantity</th>
                <th id="thBack">Back</th>
            </tr>
        </table>
     </div>
`;


const template2 = ` 
        <div>
        <br>
        <br>
        <br>
        <button id="nextMap" type="submit" class="primary">NextMap</button>
        <button id="next" type="submit" class="primary">Next</button>
        <button id="previous" type="submit" class="primary">Previous</button>
        <br>
        <br>
        <label for="username">Name</label> 
	    <input id="username" name="username">
        <button id="search" type="submit" class="primary">Search</button><br><br>
        <button id="notSearched" type="submit" class="primary">Notsearched</button>
    </div>

`;

let $template = $(template);
let $template1 = $(template1);
let $template2 = $(template2);

export default {

    render: function () {

        navigation.showNav(true);

        $('#nextMap', $template2).click(event => this.nextMap(event, $template2));
        $('#next', $template2).click(event => this.next(event, $template2, $template));
        $('#previous', $template2).click(event => this.previous(event, $template2));
        $('#search', $template2).click(event => this.search(event, $template2));
        $('#notSearched', $template2).click(event => this.notSearched(event));

        let $main = $('main').empty();
        $main.append($template2.append($template1.append($template)));


    },
    getOrders: function () {
        return $template1;
    },
    getTemp0: function () {
        return $template;
    },

    nextMap: function (event, $template) {
        event.preventDefault();
        map.nextMap($template);

    },
    next: function (event, $template2, $template) {
        event.preventDefault();
        map.next($template2, $template);
    },
    previous: function (event, $template) {
        event.preventDefault();
        map.previous($template);
    },
    search: function (event, $template) {
        event.preventDefault();
        let name = $('#username', $template).val();
        $('#username', $template).val("");
        map.search($template, name);
    },
    notSearched: function (event) {
        event.preventDefault();
        status.listGenerateHead();
        let clientList = map.exportSynStatus().filter(x => x.status === 0);
        clientList.forEach(client => status.list(client));

    }
}

