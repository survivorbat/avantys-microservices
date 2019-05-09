FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY src/webapi/*.sln /app/
COPY src/webapi/*.csproj /app/
RUN dotnet restore

COPY src/webapi /app/
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
COPY docker/expand-secrets.sh /

CMD ["/bin/sh", "-c", "/expand-secrets.sh && dotnet webapi.dll"]
