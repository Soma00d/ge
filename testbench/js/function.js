$(document).ready(function(){
    
    var ws = new WebSocket("ws://localhost:8100");  
    var dictionary = {};
    var hb_tssc;
    var hb_emcio;
    var lineContainer = $("#content_pretest .line_container");
    
    //Recupération du dictionnaire correspondant
    $("#find_dictionaries").on('click', function(){
        var family_id = 1; //penser à le passer en session php histoire de pu avoir a le gerer
         $.ajax({
            url : 'php/api.php?function=get_dictionaries_by_id&param1='+family_id,
            type : 'GET',
            dataType : 'JSON',
            success: function(data, statut){
                dictionary = data;                
                var len = data.length;
                lineContainer.empty();
                for (var iter = 0; iter < len; iter++) {
                    lineContainer.append("<div class='line id"+data[iter].id+"' data-id='"+data[iter].id+"'><span class='td'>"+data[iter].id+"</span><span class='td'>"+data[iter].symbol_name+"</span><span class='td'>"+data[iter].type+"</span><span class='td'>"+data[iter].description+"</span><span class='td press'>"+data[iter].pressed_val_freq+"</span><span class='td rel'>"+data[iter].released_val_freq+"</span><span class='td photo_piece'><img src='images/"+data[iter].photo_link+"'></span></div>");
                }
            }
         });
         console.log(dictionary);
        
    });
    
    $("#start_node").on('click', function(){
        startNode();
    });
    
    $("#stop_node").on('click', function(){
        stopNode();
    });
    $("#start_led").on('click', function(){
        startLed();
    });
    $("#stop_led").on('click', function(){
        stopLed();
    });
    
    ws.onmessage=function(event) {
           
        var message = JSON.parse(event.data);
        
        console.log(event.data);
        var canId = message.canId;
        var canData = message.canData;
               
        for (var nb = 0; nb < dictionary.length; nb++) {
            if(dictionary[nb].can_id === canId){
                switch(dictionary[nb].type){
                    case "button":                        
                        if(dictionary[nb].pressed_val_freq === canData){
                            lineContainer.find(".line.id"+dictionary[nb].id).addClass("pressed");
                        }
                        if(dictionary[nb].released_val_freq === canData){
                            lineContainer.find(".line.id"+dictionary[nb].id).addClass("released");
                        }
                }
            }
        }
    };
    
    function startNode() {
        ws.send("002400806d68d7551407f09b861e3aad000549a84402000000000000012D000000000000");
    }
    function stopNode() {
        ws.send("002400806d68d7551407f09b861e3aad000549a84402000000000000022D000000000000");
    }
    function startLed() {
        ws.send("002400806d68d7551407f09b861e3aad000549a84408000000000328FFFFFFFFFFFFFFFF");
    }
    function stopLed() {
        ws.send("002400806d68d7551407f09b861e3aad000549a844080000000003280000000000000000");
    }
        
});