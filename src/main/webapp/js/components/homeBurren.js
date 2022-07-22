import navigation from "../navigation.js";
let bool = true;


export default {
    render: function () {
        if (bool) {
            navigation.showNav(true);
            navigation.showAside(true);
            bool = false;
        }
        $('main').empty();


    }
}