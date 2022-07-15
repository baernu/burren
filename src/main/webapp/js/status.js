let $footer = $('footer');

export default {

    // Clear footer
    clear: function() {
        $footer.empty();
    },

    // Show info message in footer
    info: function(message) {
        $footer.html($('<div>').addClass('info').text(message));
    },

    // Show error message in footer
    error: function(message) {
        $footer.html($('<div>').addClass('error').text(message));
    }

}
