import router from "./router.js";

const navigationTemplate = `
    <nav>
        <div  class="innerNavigation">
            <a id="homeLink" href="#/home" class="active">Home</a>
            <a id="loginLink" href="#/login">Login</a>
            <a id="logoutLink" href="#/logout">Logout</a>
        </div>
    </nav>
`;
const menuTemplate =
`
<div id="menuTemplate">
    <span id="menuItem">&#9776</span>
</div>`;

const sideNav =

    `<div id="mySidenav" class="sidenav">
        <a id="side" href="javascript:void(0)" class="closebtn" onClick="closeNav()">&times;</a>
    </div>`;

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

            $("#loginLink", $navigationTemplate).click(e => {
                e.preventDefault();
                this.logout();
            });

            $sideNav[0].append($('<a href="#/mapping">Milktour</a>'));
            $sideNav[0].append($('<a href="#/showOrder">Show Orders</a>'));
            $sideNav[0].append($('<a href="#/editOrder">Edit Orders</a>'));

            $navigationTemplate.append($menuTemplate);
            $('#menuItem', $menuTemplate)
                .hover(event => openNav(event, $sideNav), ev => closeNav(ev, $sideNav));

            $("nav").html($navigationTemplate);
        }
        else {
            $("nav").empty();
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