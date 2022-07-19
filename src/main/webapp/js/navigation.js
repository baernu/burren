import router from "./router.js";

const navigationTemplate = `
    <nav class="innerNavigation">
        <a id="logoutLink" href="#/login">Logout</a>
    </nav>
`;


export default {
    logout: function () {
        this.showNav(false);
        router.navigate('/login');
    },
    showNav: function (show = true) {
        if (show) {
            let navTempl = $(navigationTemplate);
            let innerNav = navTempl[0];
            // Add event handler for logout to navigation
            $("a#logoutLink", navTempl).click(e => {
                e.preventDefault();
                this.logout();
            });
            // Add links for the other groups
            $(innerNav).prepend($('<a href="#/mapping">Milktour</a>'));
            $(innerNav).prepend($('<a href="#/showOrder">Show Orders</a>'));
            $(innerNav).prepend($('<a href="#/editOrder">Edit Orders</a>'));

            // // Add links for a administrator
            // if(user.type == PeopleType.ADMIN) {
            //     $(innerNav).prepend('<a href="#/moduleList">Modules</a>');
            // }
            $("nav").html(navTempl);
        }
        else {
            $("nav").empty();
        }

    }
}
