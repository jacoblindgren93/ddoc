USE ddoc;
GO
DROP PROCEDURE [RegisterUser];
GO
CREATE PROCEDURE RegisterUser 
    @UserName NVARCHAR(50),
    @Email NVARCHAR(255),
	@Password VARCHAR(MAX),
	@Guid NVARCHAR(36)
AS
BEGIN
    DECLARE @UserCount INT;
    SELECT @UserCount = COUNT(Id)
    FROM Users
    WHERE UserName = @UserName OR Email = @Email;
    IF @UserCount > 0
		BEGIN
			RETURN 0; 
		END
	
	ELSE
		BEGIN
			INSERT INTO Users(Username, Password, Email, isVerified) VALUES(@Username, @Password, @Email, 0);
			INSERT INTO Verify(Guid, UserId, Created) VALUES (@Guid,(SELECT Id FROM Users WHERE Email = @Email), CAST(GETDATE() AS DATE));
		END
END;
GO

use ddoc;
GO
CREATE PROCEDURE VerifyUser
	@Guid NVARCHAR(36)
AS
BEGIN 
    DECLARE @GuidCount NVARCHAR(36);
    SELECT @GuidCount = COUNT(Guid)
    FROM Verify
    WHERE Guid = @Guid;
    IF @GuidCount = 0
		BEGIN
			RETURN 0; 
		END
	ELSE
		BEGIN
			UPDATE Users SET IsVerified = 1 WHERE Id = (SELECT UserId FROM Verify WHERE Guid = @Guid);
			DELETE FROM Verify WHERE Guid = @Guid;
		END
END;

use ddoc;
GO
CREATE PROCEDURE ResetPassword
	@Email NVARCHAR(200),
	@NewPassword NVARCHAR(200)
AS
BEGIN
	DECLARE @EmailCount NVARCHAR(200);

	SELECT @EmailCount = COUNT(Email)
	FROM Users
	WHERE Email = @Email;

	IF @EmailCount = 0
		BEGIN
			RETURN 0;
		END
	ELSE
		BEGIN
			UPDATE Users SET Password = @NewPassword WHERE Email = @Email;
		END
END; 

use ddoc;
GO
CREATE PROCEDURE CreateProject
	@CreatedBy varchar(50),
	@ProjectName NVARCHAR(50)
AS
BEGIN
	DECLARE @ProjectExist INT;
	SELECT @ProjectExist = COUNT(Id) FROM Projects WHERE AuthorId = @AuthorId AND ProjectName = @ProjectName;

	IF @ProjectExist = 0
		BEGIN
			INSERT INTO Projects(CreatedBy, Created, OpenTickets, ProjectName) VALUES(@CreatedBy, CAST(GETDATE() AS DATE), 0, @ProjectName);
			
			DECLARE @ProjectId INT;
        	SELECT @ProjectId = Id FROM Projects WHERE AuthorId = @AuthorId AND ProjectName = @ProjectName;
			
			INSERT INTO ProjectMembers(Project, Username, Role) VALUES(@ProjectId, (SELECT Username FROM Users WHERE Id = @AuthorId), 'admin');
		END
END; 