GetPizzas();

$(document).on('click', '.my-flex-block-new', AddButton);
$(document).on('click', '.DeleteButton', DeleteButton);
$(document).on('click', '.Image', function () {
    DetailPizza(this);
});
$(document).on('click', '.RefreshButton', RefreshButton);

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
                            <img src="/Icons/Refresh.png" alt="Edit Pizza" class="RefreshButton" />
                            <img src="/Icons/Delete.png" alt="Delete Pizza" class="DeleteButton" />
                        </div>
                    </div>
                `;
                $(".Pizza-product-container").append(pizzaHtml);
            });

            const addPizzaHtml = `
                <div class="my-flex-block-new">
                    <img src="/Icons/Create.png" alt="Add Pizza" class="AddButton" />
                    <span>Добавить новую пиццу</span>
                </div>
                <div class="modal-sql" style="display:none;">
                <span class="ModalSQL-Close">&times;</span>
                <h2>Добавить Пиццу</h2>
                <label for="title">Название:</label>
                <input type="text" id="title" name="title" required>
                <p id="erro-message" class="error-message-title" style="display: none; color: red;">Пожалуйста, заполните поле выше.</p>
                <label for="src">Название изображения:</label>
                <input type="text" id="src" name="src">
                <label for="description">Описание:</label>
                <textarea id="description" name="description" required></textarea>
                <p id="erro-message" class="error-message-description" style="display: none; color: red;">Пожалуйста, заполните поле выше.</p>
                <label for="price">Цена:</label>
                <input type="number" id="price" name="price" min="0" required>
                <p d="erro-message" class="error-message-price" style="display: none; color: red;">Пожалуйста, заполните поле выше.</p>
                <button type="button">Подтвердить</button>
                </div>

                <div class="Overlay" style="display:none;"></div>

                <div class="loading" style="display: none;">
                    <div class="spinner"></div>
                    <p>Загрузка...</p>
                </div>
                `;
            $(".Pizza-product-container").append(addPizzaHtml);
        },
    });
}
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