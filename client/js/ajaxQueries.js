function listOfAutos(string)
{
    $.ajax( {
        url   : '/~user1/PHP/rest/client/api/autos/' + string,
        //url   : '/client/api/autos/' + string,
        method: 'GET'
    } ).then( function ( data )
    {
        if ('.json' == string) {
            var objJSON = JSON.parse( data );
            $('.content' ).html('');
            $.each(objJSON, function(key, val){
                $.each(val, function(key, val){
                    if ('id' == key) {
                        $('.content' ).append(
                            '<div class="col-md-4 col-md-offset-1 well">' +
                            '<div class="product" name="'+val+'"></div>' +
                            '<button class="btn btn-danger order" disabled type="button" name="'+val+'">Order</button></div>');
                    } else if('img' == key){
                        $('.content').children().last().find('.product').append(
                            '<img src="img/' + val + '" width="250" height="200">'
                        );
                    } else {
                        $('.content').children().last().find('.product').append('<h2>'+val+'</h2>');
                    }
                })
                orderBtnAction();
            })
            $('body').fadeIn(50);
        } else {
            $('.testModal').html('' +
            '<div id="myModal" class="modal fade bs-example-modal-sm"' +
            ' tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog modal-sm"><div class="modal-content">' + data + '</div></div></div>');
            $('#myModal').modal('show');
        }

    } )
}

function details(id, typeId)
{
    $.ajax( {
        url   : '/~user1/PHP/rest/client/api/autos/' + id + typeId,
        // url   : '/client/api/autos/' + id + typeId,
        method: 'GET'
    } ).then( function ( data )
    {
        if ('.json' == typeId) {
            var objJSON = JSON.parse( data );console.log($(objJSON).size());//array('status' => 'NOT-FOUND')
            if ($(objJSON).size()> 0) {
                $('.content' ).html('<div class="col-md-7 col-md-offset-1 well">' +
                '<div class="details"></div>' +
                '<div><button class="btn btn-danger order" disabled type="button">Order</button></div>' +
                '</div>');
                $.each(objJSON, function(key, val){
                    if ('id' == key) {
                        $('.order').attr('name', val)
                    } else if('img' == key) {
                        $('.details' ).append('<img src="img/' + val + '" width="500" height="400">');
                    } else {
                        $('.details' ).append('<p>' + key + ': ' + val + '</p>');
                    }
                    orderBtnAction();
                })
            } else {

            }
        } else {
        }

    } )
}

function search(searchInput, searchOption)
{
    $.ajax( {
        /* url   : '/client/api/autos/search/' + searchInput +
         '&searchOption=' + searchOption,*/
        url   : '/~user1/PHP/rest/client/api/autos/search/' + searchInput +
        '&searchOption=' + searchOption,
        method: 'GET'
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        if (objJSON.length > 0) {
            $('.content' ).html('');
            $.each(objJSON, function(key, val){
                $.each(val, function(key, val){
                    if ('id' == key) {
                        $('.content' ).append('<div class="col-md-4 col-md-offset-1 well">' +
                        '<div class="details"></div>' +
                        '<div><button class="btn btn-danger order" type="button" name="'+val+'">Order</button></div>' +
                        '</div>');
                    } else if('img' == key) {
                        $('.content').children().last().find('.details')
                            .append('<img src="img/' + val + '" width="300" height="200">');
                    } else {
                        $('.content').children().last().find('.details').append('<p>' + key + ': ' + val + '</p>');
                    }
                })
                orderBtnAction();
            })
        } else {

        }
    } )
}

function logIN( dataForRequest )
{
    $.ajax( {
        url   : '/~user1/PHP/rest/client/api/autos/login',
        //url   : '/client/api/autos/login',
        method: 'PUT',
        data  : dataForRequest,
        cache : false,
        statusCode:{
            666:function(data){
                var hash = data.statusText;
                localStorage[ 'hash' ] =
                    JSON.stringify( [ { "hash": hash } ] );
                window.location.href = window.location.href;
            },
            409:function(){
            }
        }
    } ).then( function ( data )
    {
        console.log(data);
    })
}

function logOutAjax() {
    var objJSON = JSON.parse( localStorage.getItem('hash'));
    var token;
    $.each(objJSON, function(key, val){
        token = val['hash'];
    })
    var dataForRequest = {"token": token};
    $.ajax( {
        url   : '/~user1/PHP/rest/client/api/autos/logout/' + token,
        //url   : '/client/api/autos/logout/' + token,
        method: 'PUT',
        statusCode:{
            409:function(data){
                var objJSON = JSON.parse( data.responseText );
                $.each( objJSON, function ( key, val )
                {

                } )
            },
            666:function(data){
                localStorage.clear();
                window.location.href = window.location.href;
            }}

    })
}

function registrationPost( pass, email )
{
    var dataForRequest = {"pass": pass, "email": email};
    $.ajax( {
        url   : '/~user1/PHP/rest/client/api/autos',
         //url   : '/client/api/autos',
        method: 'POST',
        data  : dataForRequest,
        statusCode:{
            409:function(data){
                var objJSON = JSON.parse( data.responseText );
                $.each( objJSON, function ( key, val )
                {
                    $('.err' ).html(val);
                } )
            },
            201:function(data){
                $('.content' ).html('<span id="success">successfully</span>');
            }}
    })
}

function cabinet() {
    var objJSON = JSON.parse( localStorage.getItem('hash'));
    var token;
    $.each(objJSON, function(key, val){
        token = val['hash'];
    })

    $.ajax( {
        //url   : '/client/api/autos/cabinet/' + token,
         url   : '/~user1/PHP/rest/client/api/autos/cabinet/' + token,
        method: 'GET'
    } ).then( function ( data )
    {
        if (2 == data.length) {
            $('.content' ).html('<div id="ordersEmpty">orders are empty</div>');
        } else {
            $('.content' ).html('<table class="table-bordered well">' +
            '<tbody>' +
            '<tr><th>Action</th><th>Model</th><th>Price</th></tr>' +
            '</tbody>' +
            '</table>');
            var objJSON = JSON.parse( data);
            var i = 0;
            $.each(objJSON, function(key, val){
                if (0 === i % 2) {
                    $('tbody' ).append('<tr><td><span name="' + val['order_id'] +
                    '" class="glyphicon glyphicon-remove" aria-hidden="true"></span></td>' +
                    '</tr>');
                } else {
                    $('tbody').children().last().append('<td>' + val['model'] + '</td><td>' + val['price'] + '</td>');
                }
                i++;
            })
        }
    })
}

function deleteOrder(id) {
    var objJSON = JSON.parse( localStorage.getItem('hash'));
    var token;
    $.each(objJSON, function(key, val){
        token = val['hash'];
    })
    $.ajax( {
        //url   : '/client/api/autos/cabinet/' + id,
         url   : '/~user1/PHP/rest/client/api/autos/cabinet/' + id,
        method: 'DELETE',
        data: JSON.stringify({'token' : token}),
        statusCode:{
            409:function(data){
                var objJSON = JSON.parse( data.responseText );
                $.each( objJSON, function ( key, val )
                {
                    $('.err' ).html(val);
                } )
            },
            201:function(data){
                $('.content' ).html('<span id="success">successfully</span>');
            }}
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data);
        $.each(objJSON, function(key, val){
            if ('OK' == val) {
                cabinet();
            }
        })
    })
}

function confirmOrder(payment, id) {
    var objJSON = JSON.parse( localStorage.getItem('hash'));
    var token;
    $.each(objJSON, function(key, val){
        token = val['hash'];
    })
    var dataForRequest = {'payment' : payment, 'car_id' : id, 'token' : token}
    $.ajax( {
        url   : '/~user1/PHP/rest/client/api/autos/addOrder',
         //url   : '/client/api/autos',
        method: 'POST',
        data  : dataForRequest
    }).then( function ( data )
    {
        cabinet();
    })
}
