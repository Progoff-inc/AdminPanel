CREATE TABLE IF NOT EXISTS users (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255),
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP,
    Token varchar(255) NULL
);

CREATE TABLE IF NOT EXISTS projects (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    UserId int(20) NOT NULL,
    Name varchar(255) NOT NULL,
    Url varchar(255) NOT NULL,

    CONSTRAINT pu_fk FOREIGN KEY(UserId) REFERENCES users(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS controllers (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    ProjectId int(20) NOT NULL,
    Name varchar(255) NOT NULL,
    Url varchar(255) NOT NULL,

    CONSTRAINT cp_fk FOREIGN KEY(ProjectId) REFERENCES projects(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS queries (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    ControllerId int(20) NOT NULL,
    QueryKey varchar(100) NOT NULL,
    Type varchar(100) NOT NULL,

    CONSTRAINT qc_fk FOREIGN KEY(ControllerId) REFERENCES controllers(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS params (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    QueryId int(20) NOT NULL,
    Name varchar(100) NOT NULL,
    Type varchar(100) NOT NULL,
    Required bit DEFAULT true,

    CONSTRAINT pq_fk FOREIGN KEY(QueryId) REFERENCES queries(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS properties (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    ParamId int(20) NOT NULL,
    Name varchar(100) NOT NULL,
    Type varchar(100) NOT NULL,
    

    CONSTRAINT pp_fk FOREIGN KEY(ParamId) REFERENCES params(Id) ON DELETE CASCADE
);