<?php

///////////////////////////////////////////////////////////////////
//connection base de donnée en PDO/////////////////////////////////
///////////////////////////////////////////////////////////////////
$VALEUR_hote='localhost';
$VALEUR_port='';
$VALEUR_nom_bd='testbench';
$VALEUR_user='root';
$VALEUR_mot_de_passe='';

$connexion = new PDO('mysql:host='.$VALEUR_hote.';port='.$VALEUR_port.';dbname='.$VALEUR_nom_bd, $VALEUR_user, $VALEUR_mot_de_passe);



///////////////////////////////////////////////////////////////////
//Routeur des fonctions appelées en ajax via des param get en url//
///////////////////////////////////////////////////////////////////
if(isset($_GET["function"])){$function = $_GET["function"];}
if(isset($_GET["param1"])){$param1 = $_GET["param1"];}
if(isset($_GET["param2"])){$param2 = $_GET["param2"];}
if(isset($_GET["param3"])){$param3 = $_GET["param3"];}
if(isset($_GET["param4"])){$param4 = $_GET["param4"];}
if(isset($_GET["param5"])){$param5 = $_GET["param5"];}




///////////////////////////////////////////////////////////////////
//Catalogue de fonction ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////

//retourne un dictionnaire complet en fonction d'une family id
$getDictionariesById = function ($id, $connexion){
    $resultats=$connexion->query("SELECT * FROM dictionaries WHERE family_id = $id");  
    $resultats->execute();
    $result = $resultats->fetchAll();

    return json_encode($result);
};


switch ($function) {
    case "get_dictionaries_by_id":
        echo $getDictionariesById($param1, $connexion);
        break;    
    default:
        echo "no param";
}


