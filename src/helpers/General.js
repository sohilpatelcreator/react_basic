let General = {

    serializeForm: function (form) {
        var field, s = {};
        if (typeof form == 'object' && form.nodeName == "FORM") {
            var len = form.elements.length;
            let i;
            for (i = 0; i < len; i++) {
                field = form.elements[i];
                if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                    if (field.type == 'select-multiple') {
                        let j;
                        for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                            if (field.options[j].selected)
                                s[field.name] = field.options[j].value;
                        }
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[field.name] = field.value;
                    }
                }
            }
        }
        return s;
    },

    validateForm: function (form) {

        return true;
    },

    makeId: function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}
export default General