export default {
    bind: function(object, $view) {
        $('[data-field]', $view).each(function() {
            let key = $(this).attr('data-field');
            if (object[key]) $(this).val(object[key]);
            $(this).change(event => object[key] = $(this).val());
            console.log($(this).val(object[key]));
        });
    },
    bindarray: function($values, $view, timearray){
        for (let element of timearray) {
            let i = 0;
            $values[i] = $(('#'+ element)).val();
            i++;
        }

    }
}