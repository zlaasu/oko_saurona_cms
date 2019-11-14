let menuTemplateFolder = "./app/menu/";

HelloVietnam.menu = function () {
    HelloVietnam.clearAuth();

    if ($("#menu-exists").length == 0) {
        $("#templates").load(menuTemplateFolder + "menu.html", function () {
            let output = Mustache.render($('#menu').html(), "");
            //console.log(output);
            $('#menu-container').html(output);
        });
    }
};

HelloVietnam.header = function () {
    HelloVietnam.clearAuth();

    if ($("#header-exists").length == 0) {
        $("#templates").load(menuTemplateFolder + "header.html", function () {
            let output = Mustache.render($('#header').html(), "");
            $('#header-container').html(output);
        });
    }
};