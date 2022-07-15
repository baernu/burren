import router from "../router.js";
import status from "../status.js";
import service from "../service.js";
import store from "../store.js";

// Template
const loginFormTemplate = `
	<div class="center-center fullpage">
		<form id="loginForm">
            <h2></h2>
            <div class='row'>
			    <label for='email'>E-Mail</label> <br>
			    <input id="email" required>
            </div>
            <div class='row'>
			    <label for='password'>Password</label> <br>
			    <input id="password" type="password" required>
            </div>
            <div class='row'>
			    <button id="loginButton" type="submit" class="primary">Login</button>
            </div>
		</form>
	</div>
`;

// exported component object
export default {
    title: 'Login',
    render: function() {
        // Get template html
        let $view = $(loginFormTemplate);
        // Render h2
        $('h2', $view).text(this.title);
        // Attach event listeners to html
        $('#loginButton', $view).click(event => login(event, $view));
        let $main = $('main').empty();
        $main.append($view);
    }
}

// Read form data
function getFormData($view) {
    return {
        email: $('#email', $view).val(),
        password: $('#password', $view).val()
    };
}

// Get form data, send to server and ideally and save JWT token
function login(event, $view) {
    event.preventDefault();
    // POSTPONED: V1.1, check validity client side
    let formData = getFormData($view);
    service.getToken(formData.email, formData.password)
        .then(token => {
            // Save received data in store
            store.setToken(token);
            // Show next view
            console.log("navigating to home");
            //router.navigate('/home');
        })
        .catch(xhr => {
            if (xhr.status === 401)
                status.error('Invalid username or password');
            else status.error(`Unexpected error (${xhr.status})`);
        });
}