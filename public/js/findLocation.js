
$(document).ready(function(){ 
    
    var obj = new findLocation_view();    
    obj.geolocate();
    obj.sleep(3000);
    obj.map = new GMaps({
        div     :   '#mapa',
        zoom    :   12,
        lat     :   obj.glat,
        lng     :   obj.glng
    });
    obj.start();

    $("#cobertura").change(function(){
        obj.km = $("#cobertura option:selected").text();
        obj.km = obj.km*1000;
        obj.filtrar();
        obj.drawMarkers();
        obj.drawLinks();
    });
});