
function myFunc()
{
	$.ajax({
		type: "GET",
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
