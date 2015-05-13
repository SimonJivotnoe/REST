
function myFunc()
{
	$.ajax({
		type: "GET",
		url: '/~user1/PHP/rest/client/api/autos/',
		cache: false,                                 
		success: function(response){
		alert(response);
		}
	});
}
$( document ).ready( function ()
{
    myFunc();
})
