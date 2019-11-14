let notificationTemplateFolder = "./app/notification/";

HelloVietnam.notificationList = function () {
    HelloVietnam.ajaxDataResponse('api/cms/notification/list', 'GET', false, function (data) {
        if (data) {
            $("#templates").load(notificationTemplateFolder + "notificationList.html", function () {

                for (var i = 0; i < data.length; i++) {
                    let date = data[i].time.substring(0, 19).split('T');

                    data[i].day = date[0];
                    data[i].hour = date[1];
                }

                data = {notification: data};
                let output = Mustache.render($('#list').html(), data);
                $('#content').html(output);

                $('table').DataTable({
                    "order": [[ 3, "desc" ]]
                });
            });
        }
    }, function (data) {
        showAjaxError(data);
    });
};

HelloVietnam.notificationHeaderRefresh = function () {
    HelloVietnam.ajaxDataResponse('api/cms/notification/list/unRead', 'GET', false, function (data) {
        if (data) {
            $("#templates").load(notificationTemplateFolder + "notificationHeader.html", function () {

                for (var i = 0; i < data.length; i++) {
                    let date = data[i].time.substring(0, 19).split('T');

                    data[i].day = date[0];
                    data[i].hour = date[1];
                }

                let count1 = 0;
                let infoData = {};
                infoData.count = data.length;
                infoData.showCount = data.length == 0 ? false : true;

                if (data.length == 0) {
                    favicon.reset();
                } else {
                    favicon.badge(data.length);
                }

                data = {notification: data, info: infoData};


                let output = Mustache.render($('#list').html(), data);
                $('#notificationHeader').html(output);

            });
        }
    }, function (data) {
        showAjaxError(data);
    });
};

HelloVietnam.notificationMarkRead = function (id) {
    HelloVietnam.ajaxDataResponse('api/cms/notification/markRead/' + id, 'GET', false, function (data) {
        if (window.location.href.includes('notification')) {
            HelloVietnam.notificationList();
        }

        HelloVietnam.notificationHeaderRefresh();

        iziToast.info({
            message: 'Mark as read.',
            position: 'bottomRight'
        });
    }, function (data) {
        showAjaxError(data);
    });
};

HelloVietnam.notificationUnMarkRead = function (id) {
    HelloVietnam.ajaxDataResponse('api/cms/notification/unMarkRead/' + id, 'GET', false, function (data) {
        if (window.location.href.includes('notification')) {
            HelloVietnam.notificationList();
        }

        HelloVietnam.notificationHeaderRefresh();

        iziToast.info({
            message: 'Mark as unread.',
            position: 'bottomRight'
        });
    }, function (data) {
        showAjaxError(data);
    });
};