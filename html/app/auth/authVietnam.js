let authTemplateFolder = "./app/auth/";

HelloVietnam.login = function () {
    $("#templates").load(authTemplateFolder + "login.html", function () {
        let output = Mustache.render($('#login').html(), "");
        $('#auth-container').html(output);

        $("#templates").html("");

        $("#loginForm").submit(function (e) {
            e.preventDefault();
        }).validate({
            rules: {},
            submitHandler: function (form) {
                let formData = {};
                formData['email'] = $("input[id='email']").val();
                formData['password'] = $("input[id='password']").val();

                HelloVietnam.ajaxDataResponse('api/auth/signin', 'POST', false,
                    function (response) {
                        iziToast.success({
                            title: 'You have logged in.',
                            position: 'topRight'
                        });

                        localStorage.token = response.accessToken;
                        window.location.href = HASH + '/home';
                    }, function (response) {
                        iziToast.error({
                            title: 'Błąd!',
                            message: 'Coś nie pykło! <b>Zły login lub hasło</b>.<br> Może nie masz konta?<br>Power jest <b>NULL?</b>',
                            position: 'topRight'
                        });
                    }, JSON.stringify(formData));

                return false;
            }
        });
    });
};

HelloVietnam.register = function () {
    $("#templates").load(authTemplateFolder + "register.html", function () {
        let output = Mustache.render($('#register').html(), "");
        $('#auth-container').html(output);

        $("#templates").html("");

        $("#registerForm").submit(function (e) {
            e.preventDefault();
        }).validate({
            rules: {
                password: "required",
                "password-confirm": {
                    equalTo: "#password"
                }
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "agree") {
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                let formData = {};
                formData['firstName'] = $("input[id='frist_name']").val();
                formData['lastName'] = $("input[id='last_name']").val();
                formData['email'] = $("input[id='email']").val();
                formData['password'] = $("input[id='password']").val();

                HelloVietnam.ajaxDataResponse('api/auth/signup', 'POST', false,
                    function (response) {
                        // let json = JSON.parse(response.responseText);

                        iziToast.success({
                            title: 'Success',
                            message: response.message,
                            position: 'topRight'
                        });

                        localStorage.token = response.accessToken;
                        window.location.href = HASH + '/login';
                    }, function (response) {
                        // let json = JSON.parse(response.responseText);

                        iziToast.error({
                            title: 'Błąd ' + response.status,
                            message: response.message,
                            position: 'topRight'
                        });
                    }, JSON.stringify(formData));

                return false;
            }
        });
    });
};

