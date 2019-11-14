let userTemplateFolder = "./app/user/";

HelloVietnam.userSettings = function () {
    HelloVietnam.ajaxDataResponse('api/cms/user/', 'GET', false, function (data) {
        $("#templates").load(userTemplateFolder + "userEdit.html #editForm", function () {

            if (data.notiOne == true) {
                data.noti = "checked";
            } else {
                data.noti = "";
            }

            if (data.api == true) {
                data.api = "checked";
            } else {
                data.api = "";
            }

            if (data.sms == true) {
                data.sms = "checked";
            } else {
                data.sms = "";
            }

            if (data.discord == true) {
                data.discord = "checked";
            } else {
                data.discord = "";
            }

            console.log(data.notiOne);
            console.log(data.notiOneStatus);

            let output = Mustache.render($('#editForm').html(), data);

            $('#content').html(output);
            $("#templates").html("");

        });
    }, function (data) {
        showAjaxError(data);
    });
};

HelloVietnam.userSave = function() {
    event.preventDefault();

    let formData = {};
    formData['firstName'] = $("input[id='firstName']").val();
    formData['lastName'] = $("input[id='lastName']").val();

    formData['notiOne'] = $('#notiOne').is(":checked") ? 1 : 0;
    formData['notiOneLogin'] = $("input[id='notiOneLogin']").val();
    formData['notiOnePassword'] = $("input[id='notiOnePassword']").val();

    formData['api'] = $('#api').is(":checked") ? 1 : 0;
    formData['apiKey'] = $("input[id='apiKey']").val();

    formData['sms'] = $('#sms').is(":checked") ? 1 : 0;
    formData['phone'] = $("input[id='phone']").val();

    formData['discord'] = $('#discord').is(":checked") ? 1 : 0;
    formData['webHook'] = $("input[id='webHook']").val();

    HelloVietnam.ajaxDataResponse('api/cms/user/', 'PUT', false, function (data) {
        showAjaxSuccessSave(data);
        window.location.href = HASH + '/user';
    }, function (data) {
        showAjaxError(data);
    }, JSON.stringify(formData));


};

HelloVietnam.updateFirebaseToken = function(token) {

    let formData = {};
    formData['firebaseToken'] = token;

    HelloVietnam.ajaxDataResponse('api/cms/user/firebaseToken', 'PUT', false, function (data) {
        console.log("updatedFBToken: " + FIREBASE_TOKEN);
    }, function (data) {
        showAjaxError(data);
    }, JSON.stringify(formData));


};


HelloVietnam.userLogout = function () {
    swal({
        title: 'Logout',
        text: 'Are you sure you want to log out?',
        icon: 'info',
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                localStorage.token = "";
                iziToast.info({
                    title: 'Goodbye',
                    message: 'Remember that <b>POWER</b>  can be <b>NULL</b>.',
                    position: 'topCenter'
                });
                window.location.href = HASH + '/login';
            }
        });
};

function showNotiOnePassword() {
    var x = document.getElementById("notiOnePassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}