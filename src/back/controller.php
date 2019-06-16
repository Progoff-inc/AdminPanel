<?php
require 'repository.php';
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

$ctxt = new DataBase();
if(isset($_GET['Key']))
{
    
    switch ($_GET['Key']) {

        // --------------- Получение данных ---------------
        case 'get-solids':
            echo json_encode($ctxt->getSolids($_GET['Login'], $_GET['Password']));

            break;
        case 'get-periodicals':
            echo json_encode($ctxt->getPeriodicals($_GET['Login'], $_GET['Password']));
            break;
        case 'get-experiments':
            echo json_encode($ctxt->getExperiments($_GET['Login'], $_GET['Password']));
            break;
        case 'get-crochets':
            echo json_encode($ctxt->getCrochets($_GET['Login'], $_GET['Password']));
            break;
        case 'get-methods':
            echo json_encode($ctxt->getMethods($_GET['Login'], $_GET['Password']));
            break;
        case 'get-authors':
            echo json_encode($ctxt->getAuthors($_GET['Login'], $_GET['Password']));
            break;
        case 'get-growings':
            echo json_encode($ctxt->getGrowings($_GET['Login'], $_GET['Password']));
            break;
        case 'get-growings':
            echo json_encode($ctxt->getExperiments($_GET['Login'], $_GET['Password']));
            break;
        case 'get-inventory':
            echo json_encode($ctxt->getInventory($_GET['Login'], $_GET['Password']));
            break;
        case 'enter':
            echo json_encode($ctxt->enterAdmin($_GET['Login'], $_GET['Password']));
            break;
        case 'get-catalog':
            echo json_encode($ctxt->getCatalog($_GET['Login'], $_GET['Password']));
            break;

        // --------------- Добавление данных ---------------


        case 'add-solid':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addSolid($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'add-crochet':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addCrochet($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'add-inventory':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addInventory($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'add-author':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addAuthor($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'add-method':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addMethod($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'add-periodical':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addPeriodical($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'add-growing':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addGrowing($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'add-catalog':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addSolidCatalog($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'add-experiment':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addExperiment($_GET['Login'], $_GET['Password'], $b));
            break;
            
            // --------------- Обновление данных ---------------
            
        case 'update-author':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->updateAuthor($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'update-crochet':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->updateCrochet($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'update-method':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->updateMethod($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'update-inventory':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->updateInventory($_GET['Login'], $_GET['Password'], $b));
            break;
        case 'update-solid':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->updateSolid($_GET['Login'], $_GET['Password'], $b));
            break;
            
            // --------------- Загрузка файлов ---------------
            
        case 'upload-file':
            $inp = json_decode(file_get_contents('php://input'), true);
            echo json_encode(array($ctxt->uploadFile($_GET['Login'], $_GET['Password'], $_GET['Id'], $_FILES, $_GET['Type'], $_GET['Column'])));
            break;
        default:
            echo "Введенный ключ несуществует";
        
    }
    
}
else
{  
    echo "Введенные данные некорректны";
}
?>