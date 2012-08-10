
/**
 * Obtiene la posición utilizando html5
 */
function obtenerUbicacion() {    
    if (navigator.geolocation) {         
        navigator.geolocation.getCurrentPosition(mostrarUbicacion);                
    } else {
        alert("Error! El navegador no soporta Geolocalizacion.");
    }
}
            
function mostrarUbicacion(posicion){
    var latitud = posicion.coords.latitude;
    var longitud = posicion.coords.longitude;
    var km = isNaN($("#cobertura option:selected").val())?5000:$("#cobertura option:selected").val()*1000;
    $("#latitud").val(latitud);
    $("#longitud").val(longitud);            
	  new GMaps({
		div: '#mapa',
		lat: latitud,
		lng: longitud
	});
    /*var mapa = dibujarMapa("mapa",latitud,longitud);
    var mrkUbicacion = dibujarMarcador(mapa,latitud,longitud,"<img src='img/user.gif' width='16px' style='position:relative;top:-2px' /> <strong>Mi ubicación</strong>");
    dibujarRadio(mapa, mrkUbicacion,km);*/
}                     


function dibujarMapa(div, latitud, longitud){             
    var latlng = new google.maps.LatLng(latitud, longitud);
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById(div),
        myOptions);            
    return map;
}

function dibujarMarcador(map, latitud, longitud, texto){
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(latitud, longitud),
        title: texto
    });
    return marker;
}

function dibujarRadio(map, marker, km){        
    var circle = new google.maps.Circle({
        map: map,
        radius: km,    
        fillColor: '#C3FDB8'
    });
    circle.bindTo('center', marker, 'position');
}





/**
 * Funciones de manipulación de coordenadas
 */
function relSitios(lst){
    $(lst).find("li").each(function(){
        $(this).find("a").click(function(){
            var latitud = $(this).attr("latitud");
            var longitud = $(this).attr("longitud"); 
            var desc = $(this).text(); 
            var km = isNaN($("#cobertura option:selected").val())?5000:$("#cobertura option:selected").val()*1000;
           
            /*$("#mapa").html("");        
            var mapa = dibujarMapa("mapa",latitud,longitud);
            var mrkUbicacion = dibujarMarcador(mapa,latitud,longitud,desc);
            dibujarRadio(mapa, mrkUbicacion,km);*/
           
            return false; 
        });
    });
    
}