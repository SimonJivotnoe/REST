$( document ).ready( function ()
{
    if (null != localStorage.getItem('hash')) {
        $('.loginStart' ).html('<div class="col-md-6">Welcome</div>' +
        '<div class="col-md-3">' +
        '<span class="glyphicon glyphicon-share" aria-hidden="true"></span></div>' +
        '<div class="col-md-3"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>' +
        '</div>');
    }
    var typeId = '.' + $('.active input').attr('id').toLowerCase();
    listOfAutos( typeId );
    $('body').on('click', '.product', function(){
       // var typeId = '.' + $('.active input').attr('id').toLowerCase();
        var id = $(this).attr('name');
        details(id, '.json');
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
       // window.location.href = "http://192.168.0.15/~user1/PHP/rest/client/";
       // window.location.href = "http://rest/client/";
        window.location.href = window.location.href ;
    })

    $('.searchBtn').on('click', function(){
        var searchInput = $('.searchInput').val();
        var searchOption = $('#selectSearch option:selected' ).text();
        if (searchInput.length > 0) {
             search(searchInput, searchOption);
        } else {

        }
    })
    $('label').on('click', function(){
        var typeId = '.' + $(this ).find('input').attr('id').toLowerCase();
        listOfAutos( typeId );
    })

    $('.glyphicon-user').on('click', function(){
        registration();
    })

    $('body').on('click', '#regSubmit', function(){
        registrationPost($( '#regPassword' ).val(), $( '#regEmail' ).val());
    })

    $('#loginBtn').on('click', function(){
        var email = $( '#loginEmail' ).val();
        var pass = $( '#loginPassword' ).val();
        var dataForRequest = {"email": email, "pass": pass};
        logIN( dataForRequest );
    })

    $('.glyphicon-share').on('click', function(){
        logOut();
    })
    
    $('.glyphicon-briefcase').on('click', function(){
        cabinet();
    })
})

function registration() {
    $('.content' ).html('<div class="container well col-md-4 col-md-offset-3">' +
    '<form method="POST" action="">' +
    '<div class="form-group">' +
    '<span class="glyphicon glyphicon-piggy-bank" aria-hidden="true"></span>' +
    '<label for="exampleInputPassword1">USER PASSWORD</label><span></span>' +
    '<input type="password" name="passReg" class="form-control" id="regPassword"' +
    'placeholder="Password">' +
    '<p>*min 4 max 10 symbols</p>' +
    '</div>' +
    '<div class="form-group">' +
    '<span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>' +
    '<label for="exampleInputEmail1">EMAIL ADDRESS</label><span class="err"></span>' +
    '<input type="email" name="mailReg" class="form-control" id="regEmail"' +
    ' placeholder="Enter email"></div>' +
    '<button type="button" id="regSubmit" class="btn btn-success" disabled>Submit</button>' +
    '</form>' +
    '</div>');
}

function logOut() {
    logOutAjax();
}

function orderBtnAction() {
    if (null != localStorage.getItem('hash')) {
        $('.order' ).removeAttr( "disabled" );
    } else {
        $('.order' ).remove();
    }
}
