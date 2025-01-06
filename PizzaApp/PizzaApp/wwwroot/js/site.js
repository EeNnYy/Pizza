$('.my-flex-block-new').off('click').on('click', AddButton);
$('.DeleteButton').off('click').on('click', DeleteButton);
$('.Image').off('click').off('click').on('click', function () {
    DetailPizza(this);
});
$('.RefreshButton').off('click').on('click', RefreshButton);

function AddButton() {
    resetModalFields();
    ShowModals();
    $('button[type="button"]').on('click', AddPizzaSubmit);
    $('.Overlay').on('click', closeModal);
    $('.ModalSQL-Close').on('click', closeModal);
}


function AddPizzaSubmit() {
    if (Validation()) {
        AddPizza(); 
    }
}
function AddPizza() {
    var updatedPizza = {
        title: $('#title').val().trim(),
        source: $('#src').val().trim() == "" ? 'DefaultImage.png' : $('#src').val().trim(),
        description: $('#description').val().trim(),
        price: Number($('#price').val().trim()),
    };
    $('.loading').show(); 
        $.ajax({
            url: '/api/pizza', 
            type: 'POST',
            data: JSON.stringify(updatedPizza),
            contentType: 'application/json',
            success: function (message) {
                $('.loading').hide(); 
                alert(message);
                $('.Overlay').hide();
                $('.modal-sql').hide();
                location.reload();
            }
        });
}
function RefreshButton() {
    resetModalFields();
    ShowModals();
    let id = GetId(this);
    GetPizzaById(id);
    $('button[type="button"]').off('click').on('click', function () {
        RefreshButtonSubmit(id);
    });
    $('.Overlay').on('click', closeModal);

    $('.ModalSQL-Close').on('click', closeModal);
}
function RefreshButtonSubmit(id) {
    if (Validation()) {
        RefreshPizza(id);
    }
}
function GetPizzaById(id) {
    $.ajax({
        url: `/api/pizza/${id}`,
        type: "GET",
        success: function (pizza) {
            $('#id').val(pizza.id);
            $('#title').val(pizza.title);
            pizza.src == "DefaultImage.png" ? $('#src').val("") : $('#src').val(pizza.source);
            $('#description').val(pizza.description);
            $('#price').val(pizza.price);
        },
    });
}

function RefreshPizza(id) {
    var updatedPizza = {
        ID: id,
        title: $('#title').val().trim(),
        source: $('#src').val().trim() == "" ? 'DefaultImage.png' : $('#src').val().trim(),
        description: $('#description').val().trim(),
        price: Number($('#price').val().trim()),
    };
    $('.loading').show();
    $.ajax({
        url: `/api/pizza`,
        type: 'PUT',
        data: JSON.stringify(updatedPizza),
        contentType: 'application/json',
        success: function (message) {
            alert(message);
            $('.loading').hide();
            $('.Overlay').hide();
            $('.modal-sql').hide();
            location.reload();
        },
    });

}
function GetId(element) {
    let mainBlock = $(element).closest('.my-flex-block');
    let id = Number(mainBlock.data('id'));
    return id;
}



function resetModalFields() {
    $('input, textarea').val('');
    $('.error-message-title, .error-message-description, .error-message-price').hide();
}


function closeModal() {
    $('.modal-sql, .Overlay').hide();
    $('#title, #src, #description, #price').val('');
    $('.error-message-title, .error-message-description, .error-message-price').hide();
    resetModalFields();
}

function DetailPizza(element) {
    let mainBlock = $(element).closest('.my-flex-block');
    window.location.href = '/Home/Detail/' + $(mainBlock).attr('data-id');
}


function ShowModals() {
    $('.modal-sql').show();
    $('.Overlay').show();
}

function Validation() {
    let isValid = true;

    if ($('#title').val().trim() == "") {
        $('.error-message-title').show();
        isValid = false;
    } else {
        $('.error-message-title').hide();
    }

    if ($('#description').val().trim() == "") {
        $('.error-message-description').show();
        isValid = false;
    } else {
        $('.error-message-description').hide();

    }

    if ($('#price').val().trim() == "") {
        $('.error-message-price').show();
        isValid = false;
    } else {
        $('.error-message-price').hide();

    }
    return isValid;
}


function DeleteButton() {
    let id = GetId(this);
    let result = confirm("Вы точно хотите удалить пиццу?");
    if (result) {
        $('.loading').show();
        $.ajax({
            url: `/api/pizza/${id}`, // URL API метода
            type: 'DELETE',
            success: function (message) {
                $('.loading').hide();
                alert(message);
                location.reload();
            },
        })
    }
}
