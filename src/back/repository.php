<?php
require 'models.php';
class DataBase {
    
    /**
     * Подключение к базе данных
     */
    public $db;
    public function __construct()
    {
        $this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_admin;charset=UTF8','nomokoiw_admin','KESRdV2f');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }

    /**
     * Загрузка файла на хост
     * 
     * Позволяет загрузить файл на хост и сохранить путь к нему в указанную таблицу, строку и колонку
     * 
     * @param string $l логин пользователя
     * @param string $p пароль пользователя
     * @param string $pid id строки в которую необходимо вставить адрес файла
     * @param blob $files файл для вставки из глобального массива $_FILES
     * @param string $t таблица, в которую вставить адрес файла
     * @param string $column столбец для вставки адреса файла
     */
    public function uploadFile($l, $p, $pid, $files, $t, $column){
        if($this->checkAdmin($l, $p)){
            $img=$this->getImage($pid, $t, $column);
            if($img){
                $this->removeFile($img);
            }
            $url = "http://client.nomokoiw.beget.tech/admin/";
            $n = basename($t."_".$pid."__".$files['Data']['name']);
            //$tid=ucfirst($t)."Id";
            $tid="id_".$t;
            $d = "Files/$n";
            if(file_exists("Files")){
                
                if(move_uploaded_file($files['Data']['tmp_name'], $d)){
                    $s = $this->db->prepare("UPDATE $t SET $column=? WHERE $tid=?");
                    $s->execute(array($url.$d, $pid));
                    return("UPDATE $t SET $column=? WHERE $tid=?");
                }else{
                    return($_FILES['Data']['tmp_name']);
                }
            }else{
                mkdir("Files");
                if(move_uploaded_file($files['Data']['tmp_name'], $d)){
                    $s = $this->db->prepare("UPDATE $t SET $column=? WHERE $tid=?");
                    $s->execute(array($url.$d, $pid));
                    return($url.$d);
                }else{
                    return($_FILES['Data']['tmp_name']);
                }
            }
            
            return false;
        }else{
            return null;
        }
    }

    /**
     * Получение адреса изображения или файла
     * 
     * @param number $id id строки
     * @param string $t таблица для поиска адреса изображения
     * @param string $column столбец для поиска изображения
     * @return string адрес файла
     */
    public function getImage($id, $t, $column){
        // $tid=ucfirst($t)."Id";
        $tid="id_".$t;
        $s = $this->db->prepare("SELECT $column FROM $t WHERE $tid=?");
        $s->execute(array($id));
        return $s->fetch()[$column];
    }

    /**
     * Генерация запроса вставки
     * 
     * @param mixed $ins объект для вставки, столбцы объекта должны соответсвовать столбцам таблицы
     * @param string $t таблица для вставки
     * @return array массив, первым элементом которого является строка запроса, вторым - массив вставляемых значений
     */
    private function genInsertQuery($ins, $t){
        $res = array('INSERT INTO '.$t.' (',array());
        $q = '';
        for ($i = 0; $i < count(array_keys($ins)); $i++) {
            $res[0] = $res[0].array_keys($ins)[$i].',';
            $res[1][]=$ins[array_keys($ins)[$i]];
            $q=$q.'?,';
            
        }
        $res[0]=rtrim($res[0],',');
        $res[0]=$res[0].') VALUES ('.rtrim($q,',').');';
        
        return $res;
        
    }

    /**
     * Генерация запроса обновления
     * 
     * @param array $keys стобцы таблицы, которые надо обновить
     * @param array $values значения, которые надо вставить в указанные стобцы
     * @param string $t таблица для вставки
     * @return array массив, первым элементом которого является строка запроса, вторым - массив вставляемых значений
     */
    private function genUpdateQuery($keys, $values, $t, $id, $id_name){
        $res = array('UPDATE '.$t.' SET ',array());
        $q = '';
        for ($i = 0; $i < count($keys); $i++) {
            if($values[$i]!='now()'){
                $res[0] = $res[0].$keys[$i].'=?, ';
                $res[1][]=$values[$i];
            }
            else{
                $res[0] = $res[0].$keys[$i].'=now(), ';
            }
            
            
        }
        $res[0]=rtrim($res[0],', ');
        $res[0]=$res[0]." WHERE $id_name = ".$id;
        
        return $res;
        
    }
    
    /**
     * Удаление файла с хоста
     * 
     * @param string $filelink путь к файлу
     */
    private function removeFile($filelink){
        $path = explode('admin/',$filelink);
        if($path[1]){
            unlink($path[1]);
        }
        
    }
    
    
    private function mergeCollection($t, $main_id_name, $main_id, $new_items){
        $sth = $this->db->prepare("DELETE FROM $t WHERE $main_id_name=?");
        $sth->execute(array($main_id));
        for($i = 0; $i<count($new_items); $i++){
            $new_items[$i][$main_id_name]=$main_id;
            $res = $this->genInsertQuery($new_items[$i], $t);
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
        }
    }
    
    // ------------------------       Запросы на получение данных из базы       ------------------------

    public function getSolids($l, $p){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->query("SELECT * FROM solids");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Solid');
        return $sth->fetchAll();
    }

    public function getPeriodicals($l, $p){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->query("SELECT * FROM periodicals");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Periodical');
        return $sth->fetchAll();
    }

    public function getCrochets($l, $p){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->query("SELECT * FROM crochets");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Crochet');
        return $sth->fetchAll();
    }

    public function getMethods($l, $p){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->query("SELECT * FROM methods");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Method');
        return $sth->fetchAll();
    }

    public function getAuthors($l, $p){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->query("SELECT * FROM authors");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Author');
        return $sth->fetchAll();
    }
    
    public function getGrowings($l, $p){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->query("SELECT g.id_growing, g.comment, g.last_update, m.name, c.name as crochet_name, c.surname as crochet_surname FROM growings g JOIN methods m ON g.id_method=m.id_method JOIN crochets c ON g.id_crochet=c.id_crochet");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Growing');
        return $sth->fetchAll();
    }

    public function getExperiments($l, $p){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->query("SELECT * FROM experiment c JOIN solids s ON c.id_solid=s.id_solids");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Experiment');
        return $sth->fetchAll();
    }

    public function getInventory($l, $p){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->query("SELECT * FROM inventory");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Inventory');
        return $sth->fetchAll();
    }

    public function getCatalog($l, $p){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->query("SELECT * FROM catalog_of_solids c JOIN solids s ON c.id_solids=s.id_solids");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Catalog');
        return $sth->fetchAll();
    }

    private function getSolidPeriodicals($id){
        $sth = $this->db->prepare("SELECT * FROM periodicals_catalog pc JOIN periodicals p ON pc.id_period=p.id_periodicals WHERE id_solid=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Periodical');
        return $sth->fetchAll();
    }

    private function getCrochet($id){
        $sth = $this->db->prepare("SELECT * FROM crochets WHERE id_crochet=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Crochet');
        return $sth->fetch();
    }
    
    public function getGrowing($l, $p, $id){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->prepare("SELECT * FROM growings WHERE id_growing=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Growing');
        return $sth->fetch();
    }
    
    public function getPeriodical($l, $p, $id){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->prepare("SELECT * FROM periodicals WHERE id_periodicals=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Periodical');
        $p = $sth->fetch();
        $p->Authors = $this->getPeriodicalAuthors($id);
        $p->Solids = $this->getPeriodicalSolids($id);
        
        return $p;
    }
    
    public function getExperiment($l, $p, $id){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $sth = $this->db->prepare("SELECT * FROM experiment WHERE id_experiment=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Experiment');
        $p = $sth->fetch();
        $p->Inventory = $this->getExperimentInventory($id);
        
        return $p;
    }

    private function getMethod($id){
        $sth = $this->db->prepare("SELECT * FROM methods WHERE id_crochet=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Method');
        return $sth->fetch();
    }

    private function getCatalogItem($id){
        $sth = $this->db->prepare("SELECT * FROM catalog_of_solids WHERE id_catalog_of_solids=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Catalog');
        return $sth->fetch();
    }

    private function getSolid($id){
        $sth = $this->db->prepare("SELECT * FROM solids WHERE id_solid=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Solid');
        return $sth->fetch();
    }

    private function getPeriodicalAuthors($id){
        $sth = $this->db->prepare("SELECT * FROM periodic_author pa JOIN authors a ON pa.id_author=a.id_authors WHERE id_period=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Author');
        return $sth->fetchAll();
    }

    private function getExperimentInventory($id){
        $sth = $this->db->prepare("SELECT ei.id_inv, ei.id_exp FROM exp_inv ei JOIN inventory i ON ei.id_inv=i.id_inventory WHERE id_exp=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Inventory');
        return $sth->fetchAll();
    }

    private function getPeriodicalSolids($id){
        $sth = $this->db->prepare("SELECT pc.id_period, pc.id_solid FROM periodicals_catalog pc JOIN solids s ON pc.id_solid =s.id_solids WHERE id_period=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Solid');
        return $sth->fetchAll();
    }

    // ------------------------       Запросы на добавление данных в базу      ------------------------
    

    public function addSolid($l, $p, $solid){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($solid,"solids");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function addCrochet($l, $p, $crochet){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($crochet,"crochets");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }
    
    public function addInventory($l, $p, $inv){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($inv,"inventory");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function addAuthor($l, $p, $auth){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($auth,"authors");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function addMethod($l, $p, $meth){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($meth,"methods");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function addPeriodical($l, $p, $per){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $solids = $per['Solids'];
        $authors = $per['Authors'];
        unset($per['Solids']);
        unset($per['Authors']);
        $res = $this->genInsertQuery($per,"periodicals");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        $id = $this->db->lastInsertId();
        for($i = 0; $i<count($solids); $i++){
            $solids[$i]['id_period']=$id;
            $this->addPeriodicalSolid($l, $p, $solids[$i]);
        }
        for($i = 0; $i<count($authors); $i++){
            $authors[$i]['id_period']=$id;
            $this->addPeriodicalAuthor($l, $p, $authors[$i]);
        }
        return $id;
    }

    private function addPeriodicalSolid($l, $p, $solid){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($solid,"periodicals_catalog");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    private function addPeriodicalAuthor($l, $p, $auth){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($auth,"periodic_author");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function addGrowing($l, $p, $gr){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($gr,"growings");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function addSolidCatalog($l, $p, $solid){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($solid,"catalog_of_solids");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function addExperiment($l, $p, $ex){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $Inventory = $ex['Inventory'];
        unset($ex['Inventory']);
        $res = $this->genInsertQuery($ex,"experiment");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        $id = $this->db->lastInsertId();
        for($i = 0; $i<count($Inventory); $i++){
            $Inventory[$i]['id_exp']=$id;
            $this->addExperimentInventory($l, $p, $Inventory[$i]);
        }
        return $id;
    }

    private function addExperimentInventory($l, $p, $inv){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($inv,"exp_inv");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }
    
    // ------------------------       Запросы на изменение данных в базе       ------------------------
    
    public function updateAuthor($l, $p, $new){
        if($this->checkAdmin($l, $p)){
            $id = $new['Id'];
            unset($new['Id']);
            $a = $this->genUpdateQuery(array_keys($new), array_values($new), "authors", $id, 'id_authors');
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }
    
    public function updateGrowing($l, $p, $new){
        if($this->checkAdmin($l, $p)){
            $id = $new['Id'];
            unset($new['Id']);
            $a = $this->genUpdateQuery(array_keys($new), array_values($new), "growings", $id, 'id_growing');
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }
    
    public function updateCrochet($l, $p, $new){
        if($this->checkAdmin($l, $p)){
            $id = $new['Id'];
            unset($new['Id']);
            $a = $this->genUpdateQuery(array_keys($new), array_values($new), "crochets", $id, 'id_crochet');
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }
    
    public function updateMethod($l, $p, $new){
        if($this->checkAdmin($l, $p)){
            $id = $new['Id'];
            unset($new['Id']);
            $a = $this->genUpdateQuery(array_keys($new), array_values($new), "methods", $id, 'id_method');
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }
    
    public function updateSolid($l, $p, $new){
        if($this->checkAdmin($l, $p)){
            $id = $new['Id'];
            unset($new['Id']);
            $a = $this->genUpdateQuery(array_keys($new), array_values($new), "solids", $id, 'id_solids');
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }
    
    public function updatePeriodical($l, $p, $new){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $id = $new['Id'];
        unset($new['Id']);
        if($new['Solids']!=null){
            $this->mergeCollection('periodicals_catalog', 'id_period', $id, $new['Solids']);
            unset($new['Solids']);
        }
        if($new['Authors']!=null){
            $this->mergeCollection('periodic_author', 'id_period', $id, $new['Authors']);
            unset($new['Authors']);
        }
        
        $a = $this->genUpdateQuery(array_keys($new), array_values($new), "periodicals", $id, 'id_periodicals');
        $s = $this->db->prepare($a[0]);
        $s->execute($a[1]);
        return $a;
    }
    
    public function updateInventory($l, $p, $new){
        if($this->checkAdmin($l, $p)){
            $id = $new['Id'];
            unset($new['Id']);
            $a = $this->genUpdateQuery(array_keys($new), array_values($new), "inventory", $id, 'id_inventory');
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }
    
    public function updateExperiment($l, $p, $new){
        if($this->checkAdmin($l, $p)){
            $id = $new['Id'];
            unset($new['Id']);
            if($new['Inventory']!=null){
                $this->mergeCollection('exp_inv', 'id_exp', $id, $new['Inventory']);
                unset($new['Inventory']);
            }
            $a = $this->genUpdateQuery(array_keys($new), array_values($new), "experiment", $id, 'id_experiment');
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }

    public function updateCatalog($l, $p, $new){
        if($this->checkAdmin($l, $p)){
            $id = $new['Id'];
            unset($new['Id']);
            $a = $this->genUpdateQuery(array_keys($new), array_values($new), "catalog_of_solids", $id, 'id_catalog_of_solids');
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }

    /**
     * Вход админа
     * 
     * Проверка корректности логина и пароля
     * @param string $l логин админа
     * @param string $p пароль админа
     * @return boolean true - данные корректны
     */
    public function enterAdmin($l, $p){
        
        return $this->checkAdmin($l, $p);
    }

    /**
     * Вход админа
     * 
     * Проверка корректности логина и пароля
     * @param string $l логин админа
     * @param string $p пароль админа
     * @return boolean true - данные корректны
     */
    private function checkAdmin($l, $p){
        
        $access = file("user.php"); 
        $login = trim($access[1]); 
        $passw = trim($access[2]);
        if($l==$login && $p==$passw){
            return true;
        }else{
            return false;
        }
    }


    
}
?>