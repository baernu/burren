export default {
    bind: function(object, $view) {
        $('[data-field]', $view).each(function() {
            let key = $(this).attr('data-field');
            if (object[key]) $(this).val(object[key]);
            $(this).change(event => object[key] = $(this).val());

        });
    },
    list: function(list, $view){
        let key;
        $('[data-field]', $view).each(() => {
            key = $(this).attr('data-field');
            list.forEach(object => {
                if (object[key]) $(this).val(object[key]);
                $(this).change(event => object[key] = $(this).val());
            });
        });


    }
}