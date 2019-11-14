let menuTemplateFolder = "./app/menu/";

HelloVietnam.menu = function () {
    if ($("#sidebar-wrapper").length == 0) {
        $("#templates").load(menuTemplateFolder + "menu.html", function () {
            let output = Mustache.render($('#menu').html(), "");
            //console.log(output);
            $('#menu-exists').html(output);
        });
    }
};

HelloVietnam.header = function () {
    if ($("#header-exists").length == 0) {
        $("#templates").load(menuTemplateFolder + "header.html", function () {
            let output = Mustache.render($('#header').html(), "");
            $('#header-container').html(output);
        });
    }
};