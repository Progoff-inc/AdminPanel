<?php
class BaseEntity{
    public $Id;
    public $Name;
    public $Description;
}

class Client extends BaseEntity{
    public $MainImage;
    public $LeftImage;
    public $RightImage;
    public $Link;
    public $Model;
    public $Logo;
    public $CreateDate;
    public $LongDescription;
}
    
class Service extends BaseEntity{
    public $Price;
}
    
class Job extends BaseEntity{
    public $Requirements;
}

class Mate extends BaseEntity{
    public $Position;
    public $VK;
    public $Instagram;
}

class Sale extends BaseEntity{
    public $Image;
    public $Discount;

    public $Services;
}

class Attachment{
    public $Id;
    public $AppId;
    public $Type;
  
    public $Content;
}

class Requirement{
    public $Id;
    public $Description;
}

class Application extends BaseEntity{
    public $Email;
    public $CreateDate;
}

class Price{
    public $Id;
    public $Name;
    public $Image;
    
    public $Services;
}
?>