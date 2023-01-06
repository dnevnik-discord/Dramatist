#Requires -Version 7.3

Set-StrictMode -Version 3.0

# ToDo:
Add-Type -Path ../../Dramatist.Core/bin/Debug/net7.0/Dramatist.Core.dll -PassThru

# $Article = [Article]::new()
# $Comment = [Comment]::new()
# $User = [User]::new()


Import-Csv ./users.csv | ForEach-Object {
    $User = [User]::new()
    $User.Id = $PSItem.UserId
    $User.Handle = $PSItem.UserHandle
    $User.Name = $PSItem.UserName
    Write-Output $User
}

