let authTemplateFolder = "./app/auth/";

HelloVietnam.login = function () {
    $("#templates").load(authTemplateFolder + "login.html", function () {
        let output = Mustache.render($('#login').html(), "");
        $('#auth-container').html(output);

        $("#templates").html("");

        $("#loginForm").submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {},
            submitHandler: function(form) {

                let formData = {};
                formData['email'] = $("input[id='email']").val();
                formData['password'] = $("input[id='password']").val();


                HelloVietnam.ajaxData('api/auth/signin', "POST", false, function (response) {
                    if (response) {
                        console.log(response);


                        console.log(response.accessToken);


                        localStorage.token = response.accessToken;
                        window.location.href = HASH + '/home';
                    }
                }, JSON.stringify(formData));

                return false;  //This doesn't prevent the form from submitting.
            }
        });
    });
};

HelloVietnam.register = function () {
    $("#templates").load(authTemplateFolder + "register.html", function () {
        let output = Mustache.render($('#register').html(), "");

        $('#auth-container').html(output);

        $('#password, #password2').on('keyup', function () {
            if ($('#password').val() == $('#password2').val()) {
                $('#match-message').html('Matching').css("color", "#28a745");
                $('#password2').isValid;
            } else {
                $('#match-message').html('Not Matching').css("color", "#dc3545");
            }

            if ($('#password2').val() == "") {
                $('#match-message').html('NULL? Like power?').css("color", "#dc3545");
            }
        });
    });
};

