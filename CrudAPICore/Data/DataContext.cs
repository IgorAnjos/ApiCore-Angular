using CrudAPICore.Model;
using Microsoft.EntityFrameworkCore;

namespace CrudAPICore.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Cliente> Clientes { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base (options) { }
    }
}