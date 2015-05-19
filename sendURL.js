
 /**
 * TODO: store the item in local store and read them here
 **/


 
sendURL();


function sendURL(url){
	var xhr = new XMLHttpRequest();
	var urlEncoded = fixedEncodeURIComponent(url);
	var local2 = local+ "/?url"+ urlEncoded;
	xhr.open("GET",local2,true);

	xhr.send();

}

function fixedEncodeURIComponent(url){
	var tmp = url;
     return encodeURIComponent(url).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}