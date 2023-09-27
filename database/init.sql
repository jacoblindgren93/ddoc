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