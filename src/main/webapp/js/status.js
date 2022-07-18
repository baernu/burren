

let $footer = $('footer');

export default {

    // Clear footer
    clear: function () {
        $footer.empty();
    },

    // Show info message in footer
    info: function (message) {
        $footer.html($('<div>').addClass('info').text(message));
    },

    // Show error message in footer
    error: function (message) {
        this.clear();
        $footer.html($('<div>').addClass('error').text(message));
    },

    listGenerateHead: function () {
        $footer.html($('<row id="rowHead">').addClass('notSearched'));
    },
    list: function (client) {
        $('#rowHead', $footer).append(addClient(client));
    }

}
function addClient(client) {
    let data = $('<tr id="trowClient">').addClass('notSearched').html(`
        <td>${client.listNumber}</td>
        <td>${client.name}</td>
        <td>${client.origin}</td>
        <td>${client.phone}</td>
    `
    );
    return data;

}
