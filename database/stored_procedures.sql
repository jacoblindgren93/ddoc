USE ddoc;
GO
DROP PROCEDURE [RegisterUser];
GO
-- INSERT INTO Users(Username, Password, Email, isVerified)
CREATE PROCEDURE RegisterUser 
    @UserName NVARCHAR(50),
    @Email NVARCHAR(255), -- Adjust the length as needed
	@Password VARCHAR(MAX),
	@Guid NVARCHAR(36)
AS
BEGIN
    DECLARE @UserCount INT;
    
    -- Check if the username or email already exists
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
	