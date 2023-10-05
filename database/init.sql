IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ddoc')
BEGIN
    CREATE DATABASE ddoc;
END;

USE ddoc

IF NOT EXISTS (select * from sysobjects where name='Users' and xtype='U')
    CREATE TABLE Users (
        Id int IDENTITY(1,1) PRIMARY KEY,
        Username varchar(50) NOT NULL UNIQUE,
        Email varchar(255) NOT NULL,
		Password varchar(MAX) NOT NULL,
        IsVerified BIT NOT NULL,
    );

IF NOT EXISTS (select * from sysobjects where name='Verify' and xtype='U')
CREATE TABLE Verify (
    Guid NVARCHAR(36),
    UserId INT,
	Created DATETIME,
    PRIMARY KEY(Guid, UserId),
    FOREIGN KEY (UserId) REFERENCES Users(Id)    
);

IF NOT EXISTS (select * from sysobjects where name='Projects' and xtype='U')
CREATE TABLE Projects(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CreatedBy varchar(50) FOREIGN KEY REFERENCES Users(Id),
	ProjectName VARCHAR(100) NOT NULL,
    Created DATETIME NOT NULL,
    OpenTickets INT,
);

IF NOT EXISTS (select * from sysobjects where name='ProjectMembers' and xtype='U')
CREATE TABLE ProjectMembers(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Project INT FOREIGN KEY REFERENCES Projects(Id),
    UserName VARCHAR(50) REFERENCES FOREIGN KEY REFERENCES Users(Username),
    Team VARCHAR(50),
);

IF NOT EXISTS (select * from sysobjects where name='Tickets' and xtype='U')
CREATE TABLE Tickets(
    Id INT IDENTITY(1,1) PRIMARY KEY,
	ProjectId INT FOREIGN KEY REFERENCES Project(Id),
    Title VARCHAR(50) NOT NULL,
	Author VARCHAR(50) FOREIGN KEY REFERENCES Users(Username),
    Description NVARCHAR(MAX),
    State int NOT NULL, 
	TimeInState DATETIME NOT NULL,
    AssignedTeam VARCHAR(50) 
);