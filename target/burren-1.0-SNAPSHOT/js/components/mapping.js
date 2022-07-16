import map from "./map.js";
import status from "../status.js";
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
        <button id="nextMap" type="submit" class="primary">NextMap</button>
        <button id="previousMap" type="submit" class="primary">PreviousMap</button> <br>
        <button id="next" type="submit" class="primary">Next</button>
        <button id="previous" type="submit" class="primary">Previous</button>
        <br>
        <br>
        <label for="username">Name</label> 
	    <input id="username" name="username">
        <button id="search" type="submit" class="primary">Search</button><br><br>
        <label for="back">Back</label>
        <input id="back" name="back" type="number">
        <button id="submitBack" type="submit" class="primary">Submit</button>
    </div>

`;

let $template = $(template);
let $template2 = $(template2);

export default {

    render: function () {
        $('#nextMap', $template2).click(event => this.nextMap(event, $template2));
        $('#previousMap', $template2).click(event => this.previousMap(event, $template2));
        $('#next', $template2).click(event => this.next(event, $template2));
        $('#previous', $template2).click(event => this.previous(event, $template2));
        $('#search', $template2).click(event => this.search(event, $template2));
        $('#submitBack', $template2).click(event => back(event, $template2));
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
        // this.render();
        },
    nextMap: function (event, $template) {
        event.preventDefault();
        map.nextMap($template);

    },
    previousMap: function (event, $template) {
        event.preventDefault();
        map.previousMap($template);
    },
    next: function (event, $template) {
        event.preventDefault();
        map.next($template);
    },
    previous: function (event, $template) {
        event.preventDefault();
        map.previous($template);
    },
    search: function (event, $template) {
        event.preventDefault();
        let name = getName($template);
        console.log(name);
        // if (name !== "Huber")
        //     console.log("leider nein");
            // status.error('please enter a name');
        $('#username', $template).val("");
        map.search($template, name);
    }
}

function getName($template) {
   return $('#username', $template).val();
}

function back(event, $template) {
    event.preventDefault();
    let number = $('#back', $template).val();
    console.log(number);
    $('#back', $template).val("");
    map.setNumberBack(number);
    status.info("back: " + map.getNumberBack());
}