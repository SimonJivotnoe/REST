/*function listOfAutos()
{
	$.ajax({
		type: "GET",
		url: '/~user1/PHP/rest/client/api/autos/',
		cache: false,                                 
		success: function(response){
		console.log(response);
		}
	});
}*/
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
function details()
{
	$.ajax({
		type: "GET",
		url: '/~user1/PHP/rest/client/api/autos/1',
		cache: false,                                 
		success: function(response){
		console.log(response);
		}
	});
}
