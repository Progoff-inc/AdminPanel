<?php
class Author{
    public $id_authors;
    public $name;
    public $last_update;
}
    
class Catalog{
    public $id_сatalog_of_solids;
    public $id_solids;
    public $id_growing;
    public $date_of_delivery;
    public $hyper_attributes;
    public $foto_of_solid;
    public $foto_of_range;
    public $hyper_range;
    public $comments;
    public $last_update;
}
    
class Crochet{
    public $id_crochet;
    public $name;
    public $surname;
    public $second_name;
    public $work_place;
    public $position;
    public $rank;
    public $last_update;
}

class Experiment{
    public $id_experiment;
    public $id_solid;
    public $conditions;
    public $range;
    public $table_of_frequency;
    public $photo;
    public $last_update;
}

class Growing{
    public $id_growing;
    public $id_crochet;
    public $id_method;
    public $comment;
    public $last_update;
}

class Inventory{
    public $id_invetory;
    public $type;
    public $model;
    public $date_of_issue;
    public $value;
    public $technical_documentation;
    public $information;
    public $last_update;
}

class Method{
    public $id_method;
    public $name;
    public $last_update;
}

class Periodical{
    public $id_periodicals;
    public $name;
    public $type;
    public $publishing_house;
    public $cipher;
    public $year;
    public $value;
    public $tom;
    public $num_part;
    public $location;
    public $hyper_text;
    public $information;
    public $last_update;
}

class Solid{
    public $id_solids;
    public $name;
    public $formulae;
    public $id_type;
    public $last_update;
}
?>