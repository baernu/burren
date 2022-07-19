import map from "./map.js";
import status from "../status.js";
const template = `
    <div >
        <table  id="table">
            <tr class="tableOrder">
                <th id="thNumber">Nr</th>
                <th id="thName">Name</th>
                <th id="th2">Addresse</th>
                <th id="th3">Number</th>
                <th id="th4">Back</th>
                <th id="th5">Status</th>
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
        <button id="actualize" type"submit" class="primary">Actualize</button>
        <br>
        <br>
        <label for="username">Name</label> 
	    <input id="username" name="username">
        <button id="search" type="submit" class="primary">Search</button><br><br>
        <label for="back">Back</label>
        <input id="back" name="back" type="number">
        <button id="submitBack" type="submit" class="primary">Submit</button><br>
        <button id="notSearched" type="submit" class="primary">Notsearched</button>
    </div>

`;

let $template = $(template);
let $template2 = $(template2);

export default {

    render: function () {
        // position.getPos();
        $('#nextMap', $template2).click(event => this.nextMap(event, $template2));
        $('#next', $template2).click(event => this.next(event, $template2));
        $('#previous', $template2).click(event => this.previous(event, $template2));
        $('#search', $template2).click(event => this.search(event, $template2));
        $('#submitBack', $template2).click(event => back(event, $template2));
        $('#actualize', $template2).click(event => this.actualize(event, $template2));
        $('#notSearched', $template2).click(event => this.notSearched(event));
        let $main = $('main').empty();
        $main.append($template).append($template2);
    },

    getOrderComponent: function() {
        return $(template);
        },

    setOrderComponent: function(orderComponent) {
        $template = orderComponent;
        let $main = $('main').empty();
        $main.append($template).append($template2);
        },
    nextMap: function (event, $template) {
        event.preventDefault();
        map.nextMap($template);

    },
    next: function (event, $template) {
        event.preventDefault();
        map.next($template);
    },
    previous: function (event, $template) {
        event.preventDefault();
        map.previous($template);
    },
    actualize: function (event, $template) {
        event.preventDefault();
        map.actualize($template);
    },
    search: function (event, $template) {
        event.preventDefault();
        let name = $('#username', $template).val();
        console.log(name);
        $('#username', $template).val("");
        map.search($template, name);
    },
    notSearched: function (event) {
        event.preventDefault();
        status.listGenerateHead();
        let clientList = map.exportList().filter(x => x.status === "open");
        clientList.forEach(client => status.list(client));
    }
}

function back(event, $template) {
    event.preventDefault();
    let number = $('#back', $template).val();
    console.log(number);
    $('#back', $template).val("");
    map.setNumberBack(number);
    status.info("back: " + map.getNumberBack());
}