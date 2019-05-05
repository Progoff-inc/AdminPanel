<?php
require 'repository.php';
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

$ctxt = new DataBase();
if(isset($_GET['Key']))
{
    
    switch ($_GET['Key']) {
        case 'add-user':
            echo json_encode($ctxt->addUser());

            break;
        case 'get-user':
            echo json_encode($ctxt->getUser());
            break;
        case 'get-team':
            echo json_encode($ctxt->getTeam());
            break;
        case 'get-jobs':
            echo json_encode($ctxt->getJobs());
            break;
        case 'add-app':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addApp($b['App'], $b['Attachment']));
            break;
        case 'get-sales':
            echo json_encode($ctxt->getSales());
            break;
        // case 'upload-file':
        //     $inp = json_decode(file_get_contents('php://input'), true);
        //     echo json_encode(array($ctxt->uploadFile($_GET['Id'], $_FILES, $_GET['Type'])));
        //     break;
        default:
            echo "Введенный ключ несуществует";
        
    }
    
}
else
{  
    echo "Введенные данные некорректны";
}
?>