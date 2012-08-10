test("El mapa cargo correctamente", function() {
    var obj = new findLocation_view();        
    obj.map = new GMaps({
        div     :   '#mapa'
    });    
    notEqual(obj.map,undefined,"El mapa se creó.");    
});

test("Sitios dentro de cobertura de 5 Km de usuario", function() {
    var cobertura = 5;
    var dst = 0, fl_dst = true;
    var obj = new findLocation_view();
    
    obj.km = 5;    
    obj.km = obj.km * 1000;
    obj.filtrar();

    for(key in obj.lst){
        dst = obj.lst[key][3];
        if(dst > cobertura){
            fl_dst=false;
            equal(fl_dst,true,"El sitio '" + obj.lst[key][2] + "' esta fuera de la cobertura ( "+ dst+" Km > " + cobertura + " Km).");           
        }
    }
    equal(fl_dst,true,"Todas los sitios turísticos deben estar dentro de la cobertura (" + cobertura + " Km).");
});

test("Sitios dentro de cobertura de 10 Km de usuario", function() {
    var cobertura = 10;
    var dst = 0, fl_dst = true;
    var obj = new findLocation_view();
    
    obj.km = 10;    
    obj.km = obj.km * 1000;
    obj.filtrar();

    for(key in obj.lst){
        dst = obj.lst[key][3];
        if(dst > cobertura){
            fl_dst=false;
            equal(fl_dst,true,"El sitio '" + obj.lst[key][2] + "' esta fuera de la cobertura ( "+ dst+" Km > " + cobertura + " Km).");           
        }
    }
    equal(fl_dst,true,"Todas los sitios turísticos deben estar dentro de la cobertura (" + cobertura + " Km).");
});