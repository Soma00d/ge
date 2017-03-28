$(document).ready(function(){
    
    var ws = new WebSocket("ws://localhost:8100");  
    var dictionary = {};    
    var lineContainer = $("#content_pretest .line_container");
    var userSSO = "";
    var partNumber = "";
    var serialNumber = "";
    var family_id;
    var sequences = "";
    var _MODE = "PRETEST";
    
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
        switch(_MODE){
            case "PRETEST":   
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
                                break;
                            case "filter1":
                                if(dictionary[nb].value === canData){
                                    var jsonFilter = '{"type":"filter1", "canData":"'+canData+'", "canId":"'+canId+'", "timer":"'+dictionary[nb].timer+'"}';
                                    ws.send(jsonFilter);
                                }
                                break;
                            case "filter2":
                                if(dictionary[nb].value === canData){
                                    var jsonFilter = '{"type":"filter2", "canData":"'+canData+'", "canId":"'+canId+'", "timer":"'+dictionary[nb].timer+'"}';
                                    ws.send(jsonFilter);
                                }
                                break;
                            case "joystick":                        
                                var joy1_horizontal = canData.substring(0,2);
                                var joy1_vertical = canData.substring(2,4);
                                var joy2_horizontal = canData.substring(4,6);
                                var joy2_vertical = canData.substring(6,8);
                                var joy3_horizontal = canData.substring(8,10);
                                var joy3_vertical = canData.substring(10,12);
                                
                                if(joy1_vertical !== '00' || joy1_horizontal !== '00'){
                                    $(".intitule span").html("JOYSTICK 1");
                                    if(joy1_vertical !== '00'){
                                        joy1_vertical = convertHexa(joy1_vertical);
                                        if(joy1_vertical<0){
                                            
                                        }else if(joy1_vertical == 0){
                                             
                                        }else{
                                            
                                        }
                                    }
                                    else{joy1_horizontal = convertHexa(joy1_horizontal)}
                                }
                                
                                if(joy2_vertical !== '00' || joy2_horizontal !== '00'){
                                    $(".intitule span").html("JOYSTICK 2");
                                    if(joy2_vertical !== '00'){joy2_vertical = convertHexa(joy2_vertical)}
                                    else{joy2_horizontal = convertHexa(joy2_horizontal)}
                                }
                                
                                if(joy3_vertical !== '00' || joy3_horizontal !== '00'){
                                    $(".intitule span").html("JOYSTICK 3");
                                    if(joy3_vertical !== '00'){joy3_vertical = convertHexa(joy3_vertical)}
                                    else{joy3_horizontal = convertHexa(joy3_horizontal)}
                                }
                                
                                break;
                            default:
                                console.log("non indentifié");
                        }
                    }
                }
                break;
        }         
        
    };
    
    function convertHexa(hexaVal){
        var newval = parseInt(hexaVal, 16);
        if(newval>0x80){
           newval = newval-0x100; 
        }
        return newval;
    }
    
    //différentes fonctions d'envoi de signaux au tsui
    $("#start_node").on('click', function(){startNode();});    
    $("#stop_node").on('click', function(){stopNode();});
    $("#start_led").on('click', function(){startLed();});
    $("#stop_led").on('click', function(){stopLed();});
    
    function startNode() {
        var data = "002400806d68d7551407f09b861e3aad000549a84402000000000000012D000000000000";
        var jsonData = '{"type":"signal", "msg":"'+data+'"}';
        console.log(jsonData);
        ws.send(jsonData);
    }
    function stopNode() {
        var data = "002400806d68d7551407f09b861e3aad000549a84402000000000000022D000000000000";
        var jsonData = '{"type":"signal", "msg":"'+data+'"}';
        ws.send(jsonData);
    }
    function startLed() {
        var data = "002400806d68d7551407f09b861e3aad000549a84408000000000328FFFFFFFFFFFFFFFF";
        var jsonData = '{"type":"signal", "msg":"'+data+'"}';
        ws.send(jsonData);
    }
    function stopLed() {
        var data = "002400806d68d7551407f09b861e3aad000549a844080000000003280000000000000000";
        var jsonData = '{"type":"signal", "msg":"'+data+'"}';
        ws.send(jsonData);
    }
        
});