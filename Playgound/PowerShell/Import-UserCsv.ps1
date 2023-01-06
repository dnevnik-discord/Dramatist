#Requires -Version 7.3

Set-StrictMode -Version 3.0

# ToDo:
Add-Type -Path ../../Dramatist.Core/bin/Debug/net7.0/Dramatist.Core.dll -PassThru

# $article = [Article]::new()
# $comment = [Comment]::new()
# $user = [User]::new()

# ToDo: path
Import-Csv ./users.csv | ForEach-Object {
    $user = [User]::new()

    $user.Id = $PSItem.id
    $user.Handle = $PSItem.handle
    $user.Name = $PSItem.name
    if ($PSItem.IsDemocrat -eq $true) {$user.IsDemocrat = $true}
    if ($PSItem.IsGerbage -eq $true) {$user.IsGerbage = $true}
    if ($PSItem.IsPutaran -eq $true) {$user.IsPutaran = $true}
    $user.Notes = $PSItem.notes;
    
    $body = ConvertTo-Json $user
    
    Invoke-RestMethod http://localhost:5252/user -Method Post `
        -ContentType "application/json; charset=utf-8" -Body $body
}

(Invoke-RestMethod http://localhost:5252/user)`
    |Select-Object -ExcludeProperty comments `
        |Export-Csv tmp.csv -UseQuotes AsNeeded
