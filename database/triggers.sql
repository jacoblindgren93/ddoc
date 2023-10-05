use ddoc;
GO
CREATE TRIGGER UpdateOpenTicketsOnProjectTable  
ON Tickets 
FOR INSERT    
AS 
BEGIN
    DECLARE @ProjectId INT;
    SELECT @ProjectId = ProjectId from inserted;
    UPDATE Projects SET OpenTickets = OpenTickets + 1 WHERE Id = @ProjectId;
END

use ddoc;
GO
CREATE TRIGGER DeleteProjectIfNoMembers  
ON ProjectMembers 
FOR DELETE    
AS 
BEGIN
    DECLARE @ProjectId INT;
	DECLARE @NrOfMembersLeft INT;
    SELECT @ProjectId = Project from deleted;
    SELECT @NrOfMembersLeft = COUNT(Id) FROM ProjectMembers WHERE Project = @ProjectId;

	IF @NrOfMembersLeft = 0
		BEGIN
			DELETE FROM Projects WHERE Id = @ProjectId;
		END
END
