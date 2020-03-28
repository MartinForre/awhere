using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace Awhere.Api.Services
{
    public class HealthWorker : IHostedService, IDisposable
    {
        private readonly DataService _dataService;
        private Timer _timer;
        public HealthWorker(DataService dataService)
        {
            _dataService = dataService;
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
            await _dataService.UpdateSeverityAsync();
            await _dataService.CleanUpExpiredPingsAsync();
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }
    }
}