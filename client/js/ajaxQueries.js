function listOfAutos()
{
	$.ajax({
		type: "GET",
		url: '/~user1/PHP/rest/client/api/autos/',
		cache: false,                                 
		success: function(response){
		console.log(response);
		}
	});
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
