# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ./MyApi ./MyApi

RUN dotnet publish ./MyApi/MyApi.csproj -c Release -o /app

# Use the ASP.NET runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app
COPY --from=build /app .


ENTRYPOINT ["dotnet", "MyApi.dll"]
