using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Awhere.Api.Services
{
    public class HealthWorker : IHostedService, IDisposable
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private Timer _timer;
        public HealthWorker(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }
        public void Dispose()
        {
            _timer?.Dispose();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(async (state) => await DoWork(state), null, TimeSpan.Zero, TimeSpan.FromHours(5));
            return Task.CompletedTask;
        }

        private async Task DoWork(object state)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var dataService = scope.ServiceProvider.GetRequiredService<DataService>();
                await dataService.UpdateSeverityAsync();
                await dataService.CleanUpExpiredPingsAsync();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }
    }
}