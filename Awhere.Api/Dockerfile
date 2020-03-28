# define the image used to build the application
FROM mcr.microsoft.com/dotnet/core/sdk:3.1.100-bionic as build-env
WORKDIR /src
# copy only the project file and do restore from that - this is to optimize the build cache (no need to restore again if nothing changed in .csproj)
COPY *.csproj .
RUN dotnet restore
# get the rest of the project and build it in release mode - place the resulting files in ./out
COPY . .
RUN dotnet publish -c Release -o out Awhere.Api.csproj

# define the image used for the final result - the runtime
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine
RUN apk update && apk add icu-libs
# create the non-root user and set the uid to 9999 to avoid conflicts with host OS just in case
RUN adduser --disabled-password --uid 9999 --gecos "" notroot
# create the folder we want to use and set the non-root user as owner
RUN mkdir /app && chown notroot.notroot /app
# change user from root to non-root - from now on, all Docker commands are run as non-root user (except for COPY)
USER notroot
# set the port to 5000 since the default production port is 80 and non-root user cannot bind to this port
ENV ASPNETCORE_URLS http://+:5000
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
WORKDIR /app
# copy the published files from the build image into this one
# COPY defaults to copying files as root, specify the user that should be owner
COPY --chown=notroot:notroot --from=build-env /src/out .
CMD ["dotnet", "Awhere.Api.dll"]
