function listOfAutos()
{
    $.ajax( {
        url   : '/~user1/PHP/rest/client/api/autos/',
        //url   : '/client/api/autos/',
        method: 'GET'
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
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
        })
        $('body').fadeIn(50);
    } )
}

function details(id)
{
    $.ajax( {
        url   : '/~user1/PHP/rest/client/api/autos/' + id,
        //url   : '/client/api/autos/' + id,
        method: 'GET'
    } ).then( function ( data )
    {
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
            })
        } else {

        }
    } )
}

