
function myFunc()
{
	$.ajax({
		type: "GET",
		//url: 'http://localhost/rest/server/api/car/Hello_world_action/.json',
		url: 'api/autos',
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