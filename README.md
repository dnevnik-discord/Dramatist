# Dramatist

## Requirements

.NET 7.0 SDK
https://dotnet.microsoft.com/en-us/download

## Installation

dotnet build

dotnet tool update --global PowerShell

pwsh ./bin/Debug/net7.0/playwright.ps1 install

## Usage

- dotnet run -- vote --article "Article1Uri" "Article2Uri" "Article3Uri"
- dotnet run -- --article "Article1Uri" "Article2Uri" "Article3Uri"

- dotnet run -- post --article "Article1Uri" "Article2Uri" "Article3Uri"