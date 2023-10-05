namespace backend.DataAccess
{
    public interface IDbAccess
    {
        bool Execute<U>(string sql, U paramters, string connectionId = "Default");
        Task<IEnumerable<T>> LoadDataStoredProcedure<T, U>(string storedProcedure, U parameters, string connectionId = "Default");
        IEnumerable<T> LoadData<T, U>(string sql, U parameters, string connectionId = "Default");
        Task<T> LoadDataSingle<T, U>(string sql, U parameters, string connectionId = "Default");
        Task<int> SaveData<T>(string storedProcedure, T parameters, string connectionId = "Default");
    }
}