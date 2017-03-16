$(document).ready(function(){
    
    var ws = new WebSocket("ws://localhost:8100");  
    var dictionary = {};    
    var lineContainer = $("#content_pretest .line_container");
    var userSSO = "";
    var partNumber = "";
    var serialNumber = "";
    var family_id;
    var sequences = "";
    
    //recupération des infos tsui homepage
    $("#send_info_hp").on('click', function(){
        userSSO = ($("#user_sso_input").val());
        partNumber = ($("#part_number_input").val());
        serialNumber = ($("#serial_number_input").val());        
        if(userSSO !== "" && partNumber !== "" && serialNumber !== ""){
            $.ajax({
            url : 'php/api.php?function=get_tsui&param1='+partNumber,
            type : 'GET',
            dataType : 'JSON',
            success: function(data, statut){
                if(data.length == 0){
                    alert("No result found with this part number.")
                }else{
                    var name = data[0].name;
                    var photo = data[0].photo_link;
                    sequences = data[0].linked_sequence;
                    family_id = data[0].family;                    
                    $(".photo_tsui").attr('src', 'images/'+photo);
                    $(".title_bloc.name").html(name);                    
                    $(".sso_user").html(userSSO);
                    $(".part_number").html(partNumber);
                    $(".serial_number").html(serialNumber);                    
                    $(".information").removeClass("hidden");
                }                
            }
         });
        }else{
            alert("Some fields are missing");
        }        
    }); 
    
    //Recupération du dictionnaire correspondant
    $("#find_dictionaries").on('click', function(){         
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
    });
    
   
   //Traitement des données websocket 
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
    
    //différentes fonctions d'envoi de signaux au tsui
    $("#start_node").on('click', function(){startNode();});    
    $("#stop_node").on('click', function(){stopNode();});
    $("#start_led").on('click', function(){startLed();});
    $("#stop_led").on('click', function(){stopLed();});
    
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