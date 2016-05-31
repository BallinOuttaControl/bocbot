function Set-Var{
param([string]$name, [string]$value)

    # Can't have environment variable names with spaces
    if ($name.Contains(" ")){
        "Unable to set `"$name`" because environment variable names can't contain spaces"
        return
    }

    # Set variable
    try{
        [Environment]::SetEnvironmentVariable($name, $value)
        "Successfully set `"$name`" to `"$value`""
    }
    catch{
        "Failed to set `"$name`" to `"$value`""
    }
}

$currentLocation = [System.IO.Path]::GetDirectoryName($MyInvocation.MyCommand.Definition)
$filePath = [System.IO.Path]::Combine($currentLocation, ".env")
$fileLines = [System.IO.File]::ReadAllLines($filePath)

foreach($line in $fileLines){

    # Ignore all comments and lines that don't contain an equals sign
    if ($line.StartsWith("#") -or !$line.Contains("=")){
        continue
    }

    # Break apart line data
    $lineData = $line.Split("=")

    # Remove leading and trailing quotes and spaces
    $name = $lineData[0].Trim("`"", " ")
    $value = $lineData[1].Trim("`"", " ")

    # Set environment variable
    Set-Var $name $value
}