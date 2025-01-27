GetPizzas();

$(document).on('click', '#ActionButton,.my-flex-block-new ', function () {
    Action(this);
});
$(document).on('click', '.Overlay,.ModalSQL-Close', CloseModal);
$(document).on('click', '#DeleteButton', function () {
    DeletePizza(this);
});
$(document).on('click', '.Image', function () {
    DetailPizza(this);
});

function GetPizzas() {
    $.ajax({
        url: '/api/pizza',
        type: 'GET',
        success: function (pizzas) {
            pizzas.forEach(function (pizza) {
                const pizzaHtml = `
                    <div class="my-flex-block" data-id="${pizza.id}">
                        <img class="Image" data-id="${pizza.id}" src="/Images/${pizza.source || 'DefaultImage.png'}" alt="${pizza.title}" />
                        <a href="/Home/Detail/${pizza.id}" id="${pizza.id}" class="Title">${pizza.title}</a>
                        <p class="Composition">${pizza.description}</p>
                        <p class="Price">${pizza.price}</p>
                        <div class="CRUDButtons">
                            <img src="/Icons/Refresh.png" id="ActionButton" alt="Edit Pizza" class="RefreshButton" />
                            <img src="/Icons/Delete.png"  id="DeleteButton" alt="Delete Pizza" class="DeleteButton" />
                        </div>
                    </div>
                `;
                $(".Pizza-product-container").append(pizzaHtml);
            });
        },
    });
}


function AddPizza() {
    if (Validation()) {
        let addPizza = {
            title: $('#title').val().trim(),
            source: $('#src').val().trim() == "" ? 'DefaultImage.png' : $('#src').val().trim(),
            description: $('#description').val().trim(),
            price: Number($('#price').val().trim()),
        };
        $('.loading').show();
        $.ajax({
            url: '/api/pizza',
            type: 'PUT',
            data: JSON.stringify(addPizza),
            contentType: 'application/json',
            success: function (message) {
                $('.loading').hide();
                alert(message);
                $('.Overlay').hide();
                $('.modal-sql').hide();
                $('#SubmitButton').off('click');
                location.reload();
            }
        });
    }
}

function UpdatePizza() {
    if (Validation()) {
        let updatedPizza = {
            ID: $('.modal-sql').data('id'),
            title: $('#title').val().trim(),
            source: $('#src').val().trim() == "" ? 'DefaultImage.png' : $('#src').val().trim(),
            description: $('#description').val().trim(),
            price: Number($('#price').val().trim()),
        };
        $('.loading').show();
        $.ajax({
            url: `/api/pizza`,
            type: 'POST',
            data: JSON.stringify(updatedPizza),
            contentType: 'application/json',
            success: function (message) {
                alert(message);
                $('.loading').hide();
                $('.Overlay').hide();
                $('.modal-sql').hide();
                $('#SubmitButton').off('click');
                location.reload();
            },
        });
    }
}

function DeletePizza(element) {
    let mainBlock = $(element).closest('.my-flex-block');
    let id = Number(mainBlock.data('id'));
    let result = confirm("Вы точно хотите удалить пиццу?");
    if (result) {
        $('.loading').show();
        $.ajax({
            url: `/api/pizza/${id}`, // URL API метода
            type: 'DELETE',
            success: function (message) {
                $('.loading').hide();
                alert(message);
                $('#SubmitButton').off('click');
                location.reload();
            },
        })
    }
}

function OpenModal() {
    $('input, textarea').val('');
    $('.error-message-title, .error-message-description, .error-message-price').hide();
    $('.modal-sql').show();
    $('.Overlay').show();
}

function CloseModal() {
    $('.modal-sql').hide();
    $('.Overlay').hide();
}

function Action(element) {
    let mainBlock = $(element).closest('.my-flex-block');
    let id = Number(mainBlock.data('id'));
    $('.modal-sql').attr('data-id', id);
    if (isNaN(id) === false) {
        OpenModal();
        FillInputs(id);
        $('#SubmitButton').text('Обновить пиццу');
        $("#SubmitButton").on('click', UpdatePizza);
    }
    else {
        OpenModal();
        $('#SubmitButton').text('Добавить пиццу ');
        $("#SubmitButton").off('click').on('click', AddPizza);
    }
}

function FillInputs(id) {
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

function DetailPizza(element) {
    let mainBlock = $(element).closest('.my-flex-block');
    window.location.href = '/Home/Detail/' + $(mainBlock).attr('data-id');
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

