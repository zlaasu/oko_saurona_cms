let userTemplateFolder = "./app/user/";

HelloVietnam.userSettings = function () {
    console.log("USER !!!");
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
