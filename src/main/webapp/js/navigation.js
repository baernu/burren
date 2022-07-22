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
    logout: function () {
        this.showNav(false);
        router.navigate('/login');
    },
    showNav: function (show = true) {
        if (show) {
            // $('nav').empty();
            $("#loginLink", $navigationTemplate).click(e => {
                e.preventDefault();
                this.logout();
            });

            $('nav').html($navigationTemplate);
        }
        else {
            $('nav').empty();
        }
    },
    showAside: function (show = false) {
        if (show) {
            $('#ulSide', $sideNav).append($('<li></li><a href="#/mapping">Milktour</a></li>').addClass("liSide"));
            $('#ulSide', $sideNav).append($('<li><a href="#/showOrder">Show Orders</a></li>').addClass("liSide"));
            $('#ulSide', $sideNav).append($('<li><a href="#/editOrder">Edit Orders</a></li>').addClass("liSide"));

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
    $sideNav.hide();
}