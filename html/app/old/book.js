$(document).ready(function () {
    $('#dataTable').DataTable({

        ajax: {
            url: API_URL + 'books',
            dataSrc: '',
        },

        aoColumns: [
            {mData: 'id'},
            {mData: 'isbn'},
            {mData: 'title'},
            {mData: 'author'},
            {mData: 'publisher'},
            {mData: 'type'},
            {
                sortable: false,
                class: "text-center",
                "render": function (data, type, full, meta) {
                    return '<a href="book.html?id=' + full.id +
                        '" style="color: white" class="btn btn-success rolloverBtn" role="button">Edit</a>' +
                        '<spacer> </spacer>' +
                        '<a onClick="delete_row_click(this.id)" id=' + full.id + ' data-target="#deleteModal" style="color: white" class="btn btn-danger deleteBtn" role="button">Delete</a>';
                }
            },
        ]

    });
});

let id = 0;
let type = 'POST';

if (getUrlParameter("id")) {
    id = getUrlParameter("id");
}

$('input[id="book_id"]').val(id);

console.log(id);

if (Number(id) > 0) {
    type = 'PUT';

    $(document).ready(function () {
        $.ajax({
            url: API_URL + "books/" + id,
            type: 'GET',
            dataType: "json",
            success: function (response) {
                $("input[id='book_isbn']").val(response.isbn);
                $("input[id='book_title']").val(response.title);
                $("input[id='book_author']").val(response.author);
                $("input[id='book_publisher']").val(response.publisher);
                $("input[id='book_type']").val(response.type);
            }
        });
    });
}


$('#book_save').on('click', function (event) {
    event.preventDefault();

    var data = {};
    data['id'] = $("input[id='book_id']").val();
    data['isbn'] = $("input[id='book_isbn']").val();
    data['title'] = $("input[id='book_title']").val();
    data['author'] = $("input[id='book_author']").val();
    data['publisher'] = $("input[id='book_publisher']").val();
    data['type'] = $("input[id='book_type']").val();

    console.log($("input[name='book_id']").val());
    console.log(JSON.stringify(data));

    $.ajax({
        url: API_URL + "books/" + id,
        type: type,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
            //window.location.href = 'bookList.html';
        }
    });
});


function delete_row_click(clicked_id) {
    $.ajax({
        url: API_URL + 'books/' + clicked_id,
        type: 'DELETE',
        dataType: 'html',
        success: function (result) {
            $('#' + clicked_id).parents("tr").remove();
        }
    });
}