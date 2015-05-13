function listOfAutos()
{
    $.ajax( {
        url   : '/~user1/PHP/rest/client/api/autos/',
        method: 'GET'
    } ).then( function ( data )
    {console.log(data);
        var objJSON = JSON.parse( data );
        $.each(objJSON, function(key, val){
            $.each(val, function(key, val){
                if ('id' == key) {
                    $('.content' ).append(
                        '<div class="col-md-4 col-md-offset-1 well">' +
                        '<div class="product" name="'+val+'"></div>' +
                        '<button class="btn btn-danger order" type="button" name="'+val+'">Order</button></div>');
                } else {
                    $('.content').children().last().find('.product').append('<h2>'+val+'</h2>');
                }
            })
        })
        $('body').fadeIn(50);
    } )
}
/*function details()
{
	$.ajax({
		type: "GET",
		url: '/~user1/PHP/rest/client/api/autos/1',
		cache: false,                                 
		success: function(response){
		console.log(response);
		}
	});
}*/
function details(id)
{
    $.ajax( {
        url   : '/~user1/PHP/rest/client/api/autos/' + id,
        method: 'GET'
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );console.log(objJSON.keys.length);//array('status' => 'NOT-FOUND')
        if (objJSON.length > 0) {
        $('.content' ).html('<div class="col-md-4 col-md-offset-1 well">' +
        '<div class="details"></div>' +
        '<div><button class="btn btn-danger order" type="button">Order</button></div>' +
        '</div>');
            $.each(objJSON, function(key, val){
                $.each(val, function(key, val){
                    if ('id' == key) {
                        $('.order').attr('name', val)
                    } else {
                        $('.details' ).append('<p>' + key + ': ' + val + '</p>');
                    }
                })
            })
        } else {

        }
    } )
}
