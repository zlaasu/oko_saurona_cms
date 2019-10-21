var HelloVietnam = HelloVietnam || {};

HelloVietnam.apiUrl = API_URL;

HelloVietnam.ajaxData = function (url, type, key, callback, data) {
    data = data || {};

    let urlPath = API_URL + url;
    let lang = $('body').data('lang') || 'pl-PL';
    $.ajax({
        type: type,
        url: urlPath,
        data: data,
        //data: JSON.stringify(data),
        contentType: 'application/json',
        cache: false,
        dataType: 'json',
        headers: {
            'Content-Language': lang,
            'Accept-Language': lang
        },
        success: callback,
        error: callback
    });
};

HelloVietnam.books = function () {
    HelloVietnam.ajaxData('books', 'GET', false, function (data) {
        if (data) {
            $("#templates").load("./templates/bookList.html #bookList", function () {
                // let users = {users: [{id : 100, name : "jane"}]};
                // let data = [{id: 100}]
                //
                // for (const user of data) {
                //     let userData = users.find(el => el.id === user.id)
                //
                // }
                let dataObj = {array : data};
                let output = Mustache.render($('#bookList').html(), dataObj);
                $('#content').html(output);
            });
        }
    });
};

HelloVietnam.bookSave = function () {
    console.log('CLICKED');
}

HelloVietnam.bookEdit = function (param) {
    HelloVietnam.ajaxData('books/' + param.id, 'GET', false, function (data) {
        if (data) {
            $("#templates").load("./templates/bookEdit.html #bookEdit", function () {
                let output = Mustache.render($('#bookEdit').html(), data);
                $('#content').html(output);

            });
        }
    });

    function bookSave() {
        console.log('CLICKED');
    }

    // $('#bookSave').on('click', function (event) {
    //     event.preventDefault();
    //
    //     console.log('CLICKED');
    //
    //     let formData = {};
    //     formData['id'] = $("input[id='book_id']").val();
    //     formData['isbn'] = $("input[id='book_isbn']").val();
    //     formData['title'] = $("input[id='book_title']").val();
    //     formData['author'] = $("input[id='book_author']").val();
    //     formData['publisher'] = $("input[id='book_publisher']").val();
    //     formData['type'] = $("input[id='book_type']").val();
    //
    //     console.log($("input[name='book_id']").val());
    //     console.log(JSON.stringify(formData));
    //
    //     HelloVietnam.ajaxData('books', 'PUT', false, function(data) {
    //         if (data) {
    //             window.location.href = '#/books';
    //         }
    //     }, formData);
    // });
};
