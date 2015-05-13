$( document ).ready( function ()
{
    listOfAutos( );
    $('body').on('click', '.product', function(){
        var id = $(this).attr('name');
        details(id);
    })

    $('body').on('click', '.order', function(){
        var id = $(this).attr('name');
        $('.content').html('<div class="col-md-4 col-md-offset-1 well">' +
        '<div class="confirmOrder">' +
        '<p><input type="text" placeholder="name" id="nameO" /></p>' +
        '<p><input type="text" placeholder="surname" id="surnameO" /></p>' +
        '<p>Type of payment<select type="text" placeholder="surname" id="payment">' +
        '<option value="cash">cash</option>' +
        '<option value="card">card</option>' +
        '</select></p>' +
        '</div>' +
        '<div><button class="btn btn-danger confirmOrderBtn" type="button" name="'+id+'">Confirm Order</button></div>' +
        '</div>');
    })

    $('body').on('click', '.confirmOrderBtn', function(){
        var name = $('#nameO' ).val();
        var surname = $('#surnameO' ).val();
        var payment = $('#payment option:selected' ).text();console.log(payment);
        var id = $(this).attr('name');console.log(id);
        if (name.length > 0 && surname.length > 0) {
            confirmOrder(name, surname, payment, id);
        } else {

        }
    });

    $('.baner').on('click', function(){
        window.location.href = "http://192.168.0.15/~user1/PHP/rest/client/";
    })
    
    $('.searchBtn').on('click', function(){
        var searchInput = $('.searchInput').val();
        var searchOption = $('#selectSearch option:selected' ).text();
        if (searchInput.length > 0) {
            search(searchInput, searchOption);
        } else {

        }
    })
})
