FROM mcr.microsoft.com/dotnet/sdk:7.0 as build
WORKDIR /src
COPY ["src/Web/Web.csproj", "src/Web/"]
COPY ["src/Contracts/Contracts.csproj", "src/Contracts/"]
COPY . .
RUN dotnet build "src/Web/Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "src/Web/Web.csproj" -c Release -o /app/publish

FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html
COPY --from=publish /app/publish/wwwroot .
COPY nginx.conf /etc/nginx/nginx.conf