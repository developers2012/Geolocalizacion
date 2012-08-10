
var glat = -12.05, glng = -77.050003;
var km = 5000;
var map, infoWindow, circle, first;    
var markersArray = [], ruta;
        
var sitios = new Array();
sitios[0] = new Array(glat,glng,"Ubicación actual");
sitios[1] = new Array(-12.0515936, -77.0346773,"Plaza San Martín");
sitios[2] = new Array(-12.060444, -77.03700300000003,"Museo de Arte de Lima");
sitios[3] = new Array(-12.0464722, -77.03003609999996,"Catedral de Lima");
sitios[4] = new Array(-12.0458132, -77.03071890000001,"Plaza de Armas de Lima");
sitios[5] = new Array(-12.0454903, -77.0274478,"Iglesia de San Francisco");
sitios[6] = new Array(-12.0523858, -77.02550080000001,"Barrio Chino");
sitios[7] = new Array(-12.0709759, -77.03413760000001,"Parque de la Reserva");
sitios[8] = new Array(-12.0861972, -77.04555679999999,"Huaca San Borja");
sitios[9] = new Array(-12.0680904, -77.08700899999997,"Parque de las leyendas");
sitios[10] = new Array(-12.1014569, -77.03521710000001,"Bosque El Olívar");
sitios[11] = new Array(-12.0867493, -77.00192390000001,"Museo de la Nación");
sitios[12] = new Array(-12.1175, -77.0430556,"Puente Villena");
sitios[13] = new Array(-12.1206102, -77.02963929999999,"Parque Kennedy");
sitios[14] = new Array(-12.1267984, -77.03656649999999,"Parque del Amor");
sitios[15] = new Array(-12.1321662, -77.0301622,"Larcomar");
sitios[16] = new Array(-12.1318199, -76.98194769999998,"Parque de la Amistad");
sitios[17] = new Array(-12.1431206, -76.99640290000002,"La Glorieta");
sitios[18] = new Array(-12.1903271, -76.96862670000002,"Parque Huaynacapac");
sitios[18] = new Array(-12.2094185, -76.98995589999998,"Pantanos de villa");


var lst=new Array();

function drawRoute(origenLat, origenLng, destinoLat, destinoLng){        
    if(ruta != undefined){
        ruta.setMap(null);    
    }
    
    ruta = map.drawRoute({
        origin: [origenLat,destinoLat],
        destination: [origenLng, destinoLng],
        travelMode: 'walking',
        strokeColor: '#153E7E',
        strokeOpacity: 0.6,
        strokeWeight: 6
    });        
    
    map.setCenter(origenLat, destinoLat);            
    
    
    return false;
}

$(document).ready(function(){    
    
    function clearOverlays() {
        if (markersArray) {
            for (var i = 0; i < markersArray.length; i++ ) {
                markersArray[i].setMap(null);
            }
        }
        markersArray = [];
    }    
  
    function filtrar(){
        var ori= sitios[0][0];
        var dst= sitios[0][1];
        lst= new Array();
        
        var or1 = new google.maps.LatLng(ori,dst), or2;
        for(key in sitios){
            or2 = new google.maps.LatLng(sitios[key][0],sitios[key][1]);
            dist = (google.maps.geometry.spherical.computeDistanceBetween(or1, or2)/1000).toFixed(1);            
            if(dist*1000<=km){
                lst[lst.length]=sitios[key];
                lst[lst.length-1][3]=dist;
            }            
        }                 
    }  
       
    function drawCircle(lat){        
        if(circle != undefined){
            circle.setMap(null);            
        }
        circle = map.drawCircle({
            lat: lat[0],
            lng: lat[1],
            radius: km,
            strokeColor: '#432070',
            strokeOpacity: 1,
            strokeWeight: 3,
            fillColor: '#A3FDB8',
            fillOpacity: 0.2
        });                
    }
    
    function drawLinks(){        
        var obj = $("#lstLugares");
        var cc = "";
        var ori= lst[0][0];
        var dst= lst[0][1];
                        
        for(key in lst){           
            cc += "<li><a href='#' onclick ='return drawRoute(" + ori + "," + lst[key][0]+ "," + dst + "," + lst[key][1] + ");' latitude='" + lst[key][0] + "' longitud='" +lst[key][1] + "'> " + lst[key][2] + " <strong style='color:blue'>(" +  lst[key][3] + " Km)</strong></a></li>";   
        }           
        obj.html("");
        obj.append(cc);
    }
    
    function drawMarkers(){
        clearOverlays();
        
        var marker;        
        var lng;
        for(key in lst){            
            marker = map.addMarker({
                lat: lst[key][0],
                lng: lst[key][1],
                title: lst[key][2]                
            });
            first = (key==0)? new Array(lst[key][0],lst[key][1]):first;
            markersArray[key]=marker;
        }       
        drawCircle(first);        
    }
    
    function geolocate(){
        //Geolocalización
        GMaps.geolocate({
            success: function(position){                            
                glat = position.coords.latitude;
                glng = position.coords.longitude;                
                map.setCenter(position.coords.latitude, position.coords.longitude);
            },
            error: function(error){
                alert('Geolocation failed: '+error.message);
            },
            not_supported: function(){
                alert("Your browser does not support geolocation");
            },
            always: function(){            
            }
        });
    }
    function geocoding(){           
        //Geocoding    
        $('#geocoding_form').submit(function(e){
            e.preventDefault();
            GMaps.geocode({
                address: $('#address').val().trim(),
                callback: function(results, status){
                    if(status=='OK'){
                        var latlng = results[0].geometry.location;
                        alert(latlng.lat() + " y " + latlng.lng());
                        map.setCenter(latlng.lat(), latlng.lng());
                        map.addMarker({
                            lat: latlng.lat(),
                            lng: latlng.lng()
                        });
                    }
                }
            });
        });
    }
       
    
    map = new GMaps({
        div     :   '#mapa',
        zoom    :   12,
        lat     :   glat,
        lng     :   glng
    });

    //Funcionalidad geolocate
    geolocate();
    
    //Funcionalidad geocoding
    geocoding();
    
    //Filtrar destinos
    filtrar();
    
    //Dibujar marcadores
    drawMarkers();
   
    //Agregar enlaces
    drawLinks();
        
    $("#cobertura").change(function(){
        km = $("#cobertura option:selected").text();        
        km = km*1000;         
        filtrar();
        drawMarkers();
        drawLinks();
    });
    
    
});