
var findLocation_view = function(){
    
    this.glat = -12.05;
    this.glng = -77.050003;
    this.km = 5000;
    this.map = null;
    this.circle = null;
    this.first = null;    
    this.markersArray = [];
    this.ruta = null;
        
    this.sitios = new Array();
    this.sitios[0] = new Array(this.glat,this.glng,"Ubicación actual");
    this.sitios[1] = new Array(-12.0515936, -77.0346773,"Plaza San Martín");
    this.sitios[2] = new Array(-12.060444, -77.03700300000003,"Museo de Arte de Lima");
    this.sitios[3] = new Array(-12.0464722, -77.03003609999996,"Catedral de Lima");
    this.sitios[4] = new Array(-12.0458132, -77.03071890000001,"Plaza de Armas de Lima");
    this.sitios[5] = new Array(-12.0454903, -77.0274478,"Iglesia de San Francisco");
    this.sitios[6] = new Array(-12.0523858, -77.02550080000001,"Barrio Chino");
    this.sitios[7] = new Array(-12.0709759, -77.03413760000001,"Parque de la Reserva");
    this.sitios[8] = new Array(-12.0861972, -77.04555679999999,"Huaca San Borja");
    this.sitios[9] = new Array(-12.0680904, -77.08700899999997,"Parque de las leyendas");
    this.sitios[10] = new Array(-12.1014569, -77.03521710000001,"Bosque El Olívar");
    this.sitios[11] = new Array(-12.0867493, -77.00192390000001,"Museo de la Nación");
    this.sitios[12] = new Array(-12.1175, -77.0430556,"Puente Villena");
    this.sitios[13] = new Array(-12.1206102, -77.02963929999999,"Parque Kennedy");
    this.sitios[14] = new Array(-12.1267984, -77.03656649999999,"Parque del Amor");
    this.sitios[15] = new Array(-12.1321662, -77.0301622,"Larcomar");
    this.sitios[16] = new Array(-12.1318199, -76.98194769999998,"Parque de la Amistad");
    this.sitios[17] = new Array(-12.1431206, -76.99640290000002,"La Glorieta");
    this.sitios[18] = new Array(-12.1903271, -76.96862670000002,"Parque Huaynacapac");
    this.sitios[18] = new Array(-12.2094185, -76.98995589999998,"Pantanos de villa");

    this.lst=new Array();       
    this.geo_status = false;
    
    this.drawRoute = function(origenLat, origenLng, destinoLat, destinoLng){        
        if(this.ruta != undefined){
            this.ruta.setMap(null);    
        }   
        this.ruta = this.map.drawRoute({
            origin: [origenLat,destinoLat],
            destination: [origenLng, destinoLng],
            travelMode: 'walking',
            strokeColor: '#153E7E',
            strokeOpacity: 0.6,
            strokeWeight: 6
        });        
    
        this.map.setCenter(origenLat, destinoLat);       
        return false;
    }

    this.clearOverlays = function() {
        if (this.markersArray) {
            for (var i = 0; i < this.markersArray.length; i++ ) {
                this.markersArray[i].setMap(null);
            }
        }
        this.markersArray = [];
    }    
  
    this.filtrar = function(){
        var ori= this.sitios[0][0];
        var dst= this.sitios[0][1];
        this.lst= new Array();
        
        var or1 = new google.maps.LatLng(ori,dst), or2;
        for(key in this.sitios){
            or2 = new google.maps.LatLng(this.sitios[key][0],this.sitios[key][1]);
            dist = (google.maps.geometry.spherical.computeDistanceBetween(or1, or2)/1000).toFixed(1);            
            if(dist*1000<=this.km){
                this.lst[this.lst.length]=this.sitios[key];
                this.lst[this.lst.length-1][3]=dist;
            }            
        }                 
    }  
       
    this.drawCircle = function(lat){        
        if(this.circle != undefined){
            this.circle.setMap(null);            
        }
        this.circle = this.map.drawCircle({
            lat: lat[0],
            lng: lat[1],
            radius: this.km,
            strokeColor: '#432070',
            strokeOpacity: 1,
            strokeWeight: 3,
            fillColor: '#A3FDB8',
            fillOpacity: 0.2
        });                
    }
    
    this.drawLinks = function(){        
        var obj = $("#lstLugares");
        var cc = "";
        var ori= this.lst[0][0];
        var dst= this.lst[0][1];
                        
        for(key in this.lst){           
            //cc += "<li><a href='#' onclick ='return findLocation_view.drawRoute(" + ori + "," + this.lst[key][0]+ "," + dst + "," + this.lst[key][1] + ");' latitude='" + this.lst[key][0] + "' longitud='" +this.lst[key][1] + "'> " + this.lst[key][2] + " <strong style='color:blue'>(" +  this.lst[key][3] + " Km)</strong></a></li>";   
            cc += "<li><a href='#' latitude='" + this.lst[key][0] + "' longitud='" +this.lst[key][1] + "'> " + this.lst[key][2] + " <strong style='color:blue'>(" +  this.lst[key][3] + " Km)</strong></a></li>";   
        }           
        obj.html("");
        obj.append(cc);
        
        var llat=0;
        var llng=0;
        var pr = this;
        
        obj.find("li").find("a").each(function(){            
            $(this).click(function(){          
                llat = $(this).attr("latitude");
                llng = $(this).attr("longitud");
                pr.drawRoute(ori, llat, dst, llng);
            });
        });
    }
    
    this.drawMarkers = function(){
        this.clearOverlays();
        
        var marker;        
        var lng;
        for(key in this.lst){            
            marker = this.map.addMarker({
                lat: this.lst[key][0],
                lng: this.lst[key][1],
                title: this.lst[key][2]
            });
            this.first = (key==0)? new Array(this.lst[key][0],this.lst[key][1]):this.first;
            this.markersArray[key]=marker;
        }
        this.drawCircle(this.first);
    }

    this.geolocate = function(){       
        document.getElementById("glat").setAttribute("value", this.glat);
        document.getElementById("glng").setAttribute("value", this.glng);                                
        GMaps.geolocate({
            success: function(position){                
                document.getElementById("glat").setAttribute("value", position.coords.latitude);
                document.getElementById("glng").setAttribute("value", position.coords.longitude);                
            },
            error: function(error){
                alert('Geolocation fail : '+error.message);
            },
            not_supported: function(){
                alert("Your browser does not support geolocation");
            },
            always: function(){                
            }            
        });                
    }
    
    this.geocoding = function (){
        var pr = this;
        //Geocoding    
        $('#geocoding_form').submit(function(e){
            e.preventDefault();
            GMaps.geocode({
                address: $('#address').val().trim(),
                callback: function(results, status){
                    if(status=='OK'){
                        var latlng = results[0].geometry.location;                    
                        pr.map.setCenter(latlng.lat(), latlng.lng());
                        pr.map.addMarker({
                            lat: latlng.lat(),
                            lng: latlng.lng()
                        });
                    }
                }
            });
        });
    }
    
    this.sleep = function(millisegundos) {
        var inicio = new Date().getTime();
        while ((new Date().getTime() - inicio) < millisegundos){}
    }
    
    this.start = function(){
        this.filtrar();
        this.glat = $("#glat").val();
        this.glng = $("#glng").val();
        this.map.setCenter(this.glat,this.glng);
        this.geocoding();                    
        this.drawMarkers();           
        this.drawLinks();      
    };        
};