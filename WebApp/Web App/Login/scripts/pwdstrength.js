    $("#<%= txtpwd.ClientID %>").keyup(function () {
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{8,}).*", "g");
        if (false == enoughRegex.test($(this).val())) {
            $('#lblpwdok').html('Minimum 8 Characters required !!');
        } else if (strongRegex.test($(this).val())) {
            $('#lblpwdok').className = 'ok';
            $('#lblpwdok').html('Strong!');
        } else if (mediumRegex.test($(this).val())) {
            $('#lblpwdok').className = 'alert';
            $('#lblpwdok').html('Medium!');
        } else {
            $('#lblpwdok').className = 'error';
            $('#lblpwdok').html('Weak!');
        }
        return true;
    });