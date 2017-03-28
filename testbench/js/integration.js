$(document).ready(function(){
    var width = 0;
    //gestion des liens des boutons
    $(".bouton").on('click', function(){
        var link = $(this).data('link');
        if(link !== ""){
            $(".page_content.active").removeClass("active");
            setTimeout(function(){
                $(document).find("#content_"+link).addClass("active");
            },100);
        }
    });
    
    //gestion du bouton retour page accueil
    $(".head_logo").on('click', function(){
        $(".page_content.active").removeClass("active")
        setTimeout(function(){
            $(document).find("#content_home").addClass("active");
        },100);
    });
    
    $(".bt_plus").on('click', function(){
        if(width !== 100){
            width += 5;
            $(".jauge_remplissage").css('width',width+'%');
        }
    });
    
    $(".bt_moins").on('click', function(){
        if(width !== 0){
            width -= 5;
            $(".jauge_remplissage").css('width',width+'%');
        }
    });
    
    $(".convert_bt").on('click', function(){
        var hexaval = $("#convert").val();
        var newval = parseInt(hexaval, 16);
        if(newval>0x80){
           newval = newval-0x100; 
        }
        $(".result_convert").html(newval);
    });
    
    
    
    
});