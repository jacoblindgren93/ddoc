using System.Data;
using System.Data.SqlClient;
using Dapper;
namespace backend.DataAccess
{

    public class DbAccess : IDbAccess
    {
        private readonly IConfiguration _config;
        public DbAccess(IConfiguration config)
        {
            _config = config;
        }

        public async Task<IEnumerable<T>> LoadData<T, U>(
            string storedProcedure,
            U parameters,
            string connectionId = "Default")
        {
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));

            return await connection.QueryAsync<T>(storedProcedure, parameters,
                commandType: CommandType.StoredProcedure);
        }

        //Returns -1 if no rows are affected.
        public async Task<int> SaveData<T>(
            string storedProcedure,
            T parameters,
            string connectionId = "Default")
        {
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString(connectionId));

            return await connection.ExecuteAsync(storedProcedure, parameters,
                commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<T> LoadData<T>(string sql, string connectionId = "Default")
        {
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString(connectionId));
            return dbConnection.Query<T>(sql);
        }

        public bool Execute(string sql, string connectionId = "Default")
        {
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString(connectionId));
            return dbConnection.Execute(sql) > 0;
        }

        public T LoadDataSingle<T, U>(string sql, U parameters, string connectionId = "Default")
        {
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString(connectionId));
            return dbConnection.QueryFirstOrDefault<T>(sql, parameters);
        }

    }
}
