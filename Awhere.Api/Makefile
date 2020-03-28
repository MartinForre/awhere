start_db:	
	@echo "Starting SQL container..."
	@docker run -e 'ACCEPT_EULA=Y' --name awhere_db -e 'SA_PASSWORD=yourAwesome#Password' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-CU8-ubuntu
	@echo "Waiting for SQL server to spin up..."
	@sleep 10
	@echo "Creating database..."
	@dotnet ef database drop
	@dotnet ef database update