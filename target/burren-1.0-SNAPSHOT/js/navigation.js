import router from "./router.js";

const navigationTemplate = `
    <nav>
        <div  id="nav1" class="innerNavigation">
            <a id="homeLink" href="#/home" class="active">Home</a>
            <a id="loginLink" href="#/login">Login</a>
            <a id="logoutLink" href="#/logout">Logout</a>
        </div>
    </nav>
`;
const menuTemplate =
`
<div id="menuTemplate" class="menuTemplate">
    <span id="menuItem">&#9776</span>
</div>`;

const sideNav =

    `
<aside>
    <div id="mySidenav" >
        <ul id="ulSide" class="sidenav"></ul>
    </div>
</aside>`;

let $sideNav = $(sideNav);
let $menuTemplate = $(menuTemplate);
let $navigationTemplate = $(navigationTemplate);


export default {
    login: function () { router.navigate('/login');},
    mapps: function () { router.navigate('/mapping');},
    homes: function () { router.navigate('/homeBurren');},
    logout: function () { router.navigate('/homeBurren');},
    showOrders: function () { router.navigate('/showOrder');},
    editOrders: function () { router.navigate('/editOrder');},


    showNav: function (showNav = true) {
        if (showNav) {
            // $('nav').empty();
            $("#loginLink", $navigationTemplate).click(e => { e.preventDefault(); this.login();});
            $("#homeLink", $navigationTemplate).click(e => { e.preventDefault(); this.homes();});
            $("#LogoutLink", $navigationTemplate).click(e => { e.preventDefault(); this.homes();});

            $('nav').html($navigationTemplate);
        }
        else {
            $('nav').empty();
        }
    },

    showAside: function (showAside = true) {
        if (showAside) {
            $('#ulSide', $sideNav).append($('<li><a id="mappID" href="#/mapping">Milktour</a></li>').addClass("liSide"));
            $('#ulSide', $sideNav).append($('<li><a id="showOrderID" href="#/showOrder">Show Orders</a></li>').addClass("liSide"));
            $('#ulSide', $sideNav).append($('<li><a id="editOrderID" href="#/editOrder">Edit Orders</a></li>').addClass("liSide"));

            $("#mappID", $sideNav).click(e => { e.preventDefault(); this. mapps();});
            $("#showOrderID", $sideNav).click(e => { e.preventDefault(); this.showOrders();});
            $("#editOrderID", $sideNav).click(e => { e.preventDefault(); this.editOrders();});

            $('#menuItem', $menuTemplate)
                .hover(event => openNav(event, $sideNav), ev => closeNav(ev, $sideNav));

            $('aside').html($menuTemplate);

        }
        else {
            $('aside').empty();
        }
    }
}
let bool = true;
function openNav(event, $sideNav) {
    event.preventDefault();
    if (bool) {
        $menuTemplate.append($sideNav);
        bool = false;
    } else
        $sideNav.show();
}

function closeNav(event, $sideNav) {
    event.preventDefault();

    // $sideNav.hide();
}